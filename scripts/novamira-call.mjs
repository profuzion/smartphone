#!/usr/bin/env node
// Direct HTTP MCP client for NovaMira on Profuzion WP.
// Reads .mcp.json for credentials. Single-shot or piped JSON-RPC over Streamable HTTP.
//
// Usage:
//   node scripts/novamira-call.mjs init
//   node scripts/novamira-call.mjs php "return get_option('siteurl');"
//   node scripts/novamira-call.mjs php-file path/to/script.php
//   node scripts/novamira-call.mjs write-file <remote-path> <local-file> [base64]
//   node scripts/novamira-call.mjs ls <remote-path> [--recursive]
//   node scripts/novamira-call.mjs raw <ability_name> <json-params>
//   node scripts/novamira-call.mjs sync-theme [local-theme-dir]
//        Deploy child theme via novamira/write-file (default: tools/wordpress/profuzion-brick-child), then finalize.
//   node scripts/novamira-call.mjs finalize-theme
//        Activate theme + Bricks JSON import only (no file upload).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ''), '..');
const mcpFile = path.join(projectRoot, '.mcp.json');
const cfg = JSON.parse(fs.readFileSync(mcpFile, 'utf8'));
const server = Object.values(cfg.mcpServers)[0];
const URL_ = server.env.WP_API_URL;
const USER = server.env.WP_API_USERNAME;
const PASS = server.env.WP_API_PASSWORD;
const AUTH = 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64');

const SESSION_FILE = path.join(projectRoot, '.novamira-session');

async function rpc(body, sid) {
  const headers = {
    'Authorization': AUTH,
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream',
  };
  if (sid) headers['Mcp-Session-Id'] = sid;
  const r = await fetch(URL_, { method: 'POST', headers, body: JSON.stringify(body) });
  const newSid = r.headers.get('mcp-session-id');
  const text = await r.text();
  return { status: r.status, sid: newSid, text };
}

async function getSession() {
  if (fs.existsSync(SESSION_FILE)) {
    const sid = fs.readFileSync(SESSION_FILE, 'utf8').trim();
    if (sid) return sid;
  }
  // Initialize a fresh session
  const init = await rpc({
    jsonrpc: '2.0', id: 1, method: 'initialize',
    params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'claude-code', version: '1.0' } },
  });
  if (!init.sid) throw new Error('No session id from initialize: ' + init.text);
  await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' }, init.sid);
  fs.writeFileSync(SESSION_FILE, init.sid);
  return init.sid;
}

function parseToolText(rawText) {
  // Accept either plain JSON or SSE-wrapped
  const m = rawText.match(/data:\s*(\{[\s\S]*\})/);
  const body = m ? m[1] : rawText;
  const r = JSON.parse(body);
  if (r.error) throw new Error('RPC error: ' + JSON.stringify(r.error));
  const t = r.result?.content?.[0]?.text;
  if (!t) return r.result;
  try { return JSON.parse(t); } catch { return t; }
}

async function callAbility(name, params) {
  const sid = await getSession();
  const id = crypto.randomInt(1e9);
  const body = {
    jsonrpc: '2.0', id,
    method: 'tools/call',
    params: { name: 'mcp-adapter-execute-ability', arguments: { ability_name: name, parameters: params } },
  };
  const r = await rpc(body, sid);
  if (r.status === 404 || /session not found/i.test(r.text)) {
    // Stale session, re-init
    if (fs.existsSync(SESSION_FILE)) fs.unlinkSync(SESSION_FILE);
    return callAbility(name, params);
  }
  return parseToolText(r.text);
}

/** @param {string} dir */
function *walkFiles(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git' || name === '.DS_Store') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) yield *walkFiles(full);
    else yield full;
  }
}

/** Binary-ish → base64 for novamira/write-file */
function encodingForFile(relPosix, buf) {
  if (buf.includes(0)) return 'base64';
  if (/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|eot|pdf|zip)$/i.test(relPosix)) return 'base64';
  return 'utf8';
}

/** NovaMira execute-php often wraps scalars — normalize to string path */
function unwrapPhpScalar(probe) {
  if (typeof probe === 'string') return probe.trim();
  if (probe && typeof probe === 'object') {
    for (const k of ['result', 'output', 'return', 'text', 'message', 'data']) {
      const v = probe[k];
      if (typeof v === 'string') return v.trim();
    }
  }
  return null;
}

/** Absolute filesystem path returned by novamira/execute-php */
function extractPhpReturnPath(probe) {
  const flat = unwrapPhpScalar(probe);
  if (flat && flat.startsWith('/')) return flat.replace(/\/+$/, '');
  const rv = probe?.data?.return_value;
  if (typeof rv === 'string' && rv.startsWith('/')) return rv.replace(/\/+$/, '');
  const rv2 = probe?.return_value;
  if (typeof rv2 === 'string' && rv2.startsWith('/')) return rv2.replace(/\/+$/, '');
  return null;
}

/** NovaMira execute-php JSON return helper */
function parsePhpJsonReturn(raw) {
  let inner = raw?.data?.return_value ?? raw?.return_value ?? raw;
  if (typeof inner === 'string') {
    try {
      inner = JSON.parse(inner);
    } catch {
      /* keep string */
    }
  }
  return inner;
}

/**
 * Mirror sandbox → theme, then Bricks import in a **second** execute-php request.
 * Single-request finalize breaks imports: WP bootstraps the child theme before mirror(),
 * so require_once bricks-import-lib.php resolves once to the OLD file on disk.
 */
async function finalizeProfuzionThemeRemote() {
  const mirrorPhp = `
$slug = 'profuzion-brick-child';
$stage = WP_CONTENT_DIR . '/novamira-sandbox/pfz-upload/' . $slug;
$target = trailingslashit(get_theme_root()) . $slug;
if (!is_dir($stage)) {
  return wp_json_encode(['ok' => false, 'error' => 'staging dir missing', 'stage' => $stage]);
}
function pfz_mirror_overwrite($src, $dst) {
  if (!is_dir($src)) {
    return;
  }
  if (!is_dir($dst)) {
    mkdir($dst, 0755, true);
  }
  foreach (scandir($src) as $f) {
    if ($f === '.' || $f === '..') {
      continue;
    }
    $s = $src . '/' . $f;
    $t = $dst . '/' . $f;
    if (is_dir($s)) {
      pfz_mirror_overwrite($s, $t);
    } else {
      $dir = dirname($t);
      if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
      }
      copy($s, $t);
    }
  }
}
pfz_mirror_overwrite($stage, $target);
$lib = $target . '/includes/bricks-import-lib.php';
return wp_json_encode([
  'ok'       => is_readable($lib),
  'phase'    => 'mirrored',
  'target'   => $target,
  'has_lib'  => is_readable($lib),
]);
`.trim();

  const importPhp = `
$slug = 'profuzion-brick-child';
switch_theme($slug);
flush_rewrite_rules(true);
try {
  $imp = profuzion_import_bricks_from_theme_directory(false);
  return wp_json_encode(['ok' => true, 'stylesheet' => get_stylesheet(), 'import_lines' => $imp['lines']]);
} catch (Throwable $e) {
  return wp_json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
`.trim();

  const mirrorOut = parsePhpJsonReturn(await callAbility('novamira/execute-php', { code: mirrorPhp }));
  console.error('Mirror:', JSON.stringify(mirrorOut, null, 2));
  if (mirrorOut && mirrorOut.ok === false) {
    process.exitCode = 1;
    return;
  }

  const inner = parsePhpJsonReturn(await callAbility('novamira/execute-php', { code: importPhp }));
  console.log(JSON.stringify(inner, null, 2));
  if (inner && inner.ok === false) process.exitCode = 1;
}

async function syncTheme(localThemeAbs) {
  if (!fs.existsSync(localThemeAbs)) throw new Error('Missing theme folder: ' + localThemeAbs);

  const probe = await callAbility('novamira/execute-php', {
    code: 'return WP_CONTENT_DIR . "/novamira-sandbox/pfz-upload/profuzion-brick-child";',
  });
  const remoteStagingRoot = extractPhpReturnPath(probe);
  if (!remoteStagingRoot) {
    throw new Error('Could not resolve staging path from execute-php: ' + JSON.stringify(probe).slice(0, 500));
  }
  console.error('Remote staging root:', remoteStagingRoot);

  let n = 0;
  for (const fileAbs of walkFiles(localThemeAbs)) {
    const rel = path.relative(localThemeAbs, fileAbs).split(path.sep).join('/');
    const remotePath = `${remoteStagingRoot}/${rel}`;
    const buf = fs.readFileSync(fileAbs);
    const enc = encodingForFile(rel, buf);
    const content = enc === 'base64' ? buf.toString('base64') : buf.toString('utf8');
    const out = await callAbility('novamira/write-file', {
      path: remotePath,
      content,
      encoding: enc === 'base64' ? 'base64' : 'utf-8',
    });
    if (typeof out === 'string' && (/sandbox/i.test(out) || /cannot/i.test(out))) {
      throw new Error(`write-file rejected (${rel}): ${out}`);
    }
    if (out && out.success === false) {
      throw new Error(`write-file failed (${rel}): ${JSON.stringify(out)}`);
    }
    n++;
    if (n % 10 === 0) console.error('Uploaded', n, 'files…');
  }
  console.error('Uploaded', n, 'files total.');

  await finalizeProfuzionThemeRemote();
}

const [, , cmd, ...args] = process.argv;

try {
  if (cmd === 'init') {
    if (fs.existsSync(SESSION_FILE)) fs.unlinkSync(SESSION_FILE);
    const sid = await getSession();
    console.log('Session:', sid);
  } else if (cmd === 'php') {
    const code = args.join(' ');
    if (!code) throw new Error('Usage: php "<code>"');
    const out = await callAbility('novamira/execute-php', { code });
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'php-file') {
    const code = fs.readFileSync(args[0], 'utf8');
    const out = await callAbility('novamira/execute-php', { code });
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'write-file') {
    const [remote, local, enc] = args;
    const isBase64 = enc === 'base64';
    const content = isBase64
      ? fs.readFileSync(local).toString('base64')
      : fs.readFileSync(local, 'utf8');
    const out = await callAbility('novamira/write-file', {
      path: remote, content, encoding: isBase64 ? 'base64' : 'utf-8',
    });
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'ls') {
    const recursive = args.includes('--recursive');
    const path_ = args.find(a => !a.startsWith('--')) || '';
    const out = await callAbility('novamira/list-directory', { path: path_, recursive, max_depth: 5 });
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'raw') {
    const [ability, jsonParams] = args;
    const out = await callAbility(ability, JSON.parse(jsonParams || '{}'));
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'sync-theme') {
    const rel = args[0] || 'tools/wordpress/profuzion-brick-child';
    const localThemeAbs = path.resolve(projectRoot, rel);
    await syncTheme(localThemeAbs);
  } else if (cmd === 'finalize-theme') {
    await finalizeProfuzionThemeRemote();
  } else {
    console.error('Unknown command:', cmd);
    process.exit(2);
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
