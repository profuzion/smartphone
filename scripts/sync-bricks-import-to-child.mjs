/**
 * Copy generated Bricks handoff JSON into the child theme for deploy + WP-CLI import.
 * v2 home + case; v10 native-text homepage pair; header/footer from v6.
 * Run via npm run wp:handoff (after generators).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const destDir = path.join(root, "tools", "wordpress", "profuzion-brick-child", "bricks-import");

const copies = [
  {
    fromDir: path.join(root, "src", "app", "v2"),
    files: ["profuzion-v2-bricks-import.json", "profuzion-v2-bricks-case-import.json"],
  },
  {
    fromDir: path.join(root, "src", "app", "v10"),
    files: [
      "profuzion-v10-bricks-import.json",
      "profuzion-v10-bricks-home-import.json",
    ],
  },
  {
    fromDir: path.join(root, "src", "app", "v6"),
    files: ["profuzion-v6-bricks-header-import.json", "profuzion-v6-bricks-footer-import.json"],
  },
];

const allowed = new Set(
  copies.flatMap((c) => c.files),
);

fs.mkdirSync(destDir, { recursive: true });

for (const { fromDir, files } of copies) {
  for (const f of files) {
    const srcPath = path.join(fromDir, f);
    if (!fs.existsSync(srcPath)) {
      throw new Error(`Missing ${srcPath} — run npm run bricks:import first`);
    }
    fs.copyFileSync(srcPath, path.join(destDir, f));
  }
}

for (const ent of fs.readdirSync(destDir, { withFileTypes: true })) {
  if (!ent.isFile() || !ent.name.endsWith(".json")) continue;
  if (!allowed.has(ent.name)) {
    fs.unlinkSync(path.join(destDir, ent.name));
    console.warn(`Removed stale bricks-import/${ent.name}`);
  }
}

const logoSrc = path.join(root, "public", "pfs-logo-horizontal-light-v2.svg");
const logoDestDir = path.join(
  root,
  "tools",
  "wordpress",
  "profuzion-brick-child",
  "assets",
  "media",
);
const logoDest = path.join(logoDestDir, "pfs-logo-horizontal-light-v2.svg");
if (!fs.existsSync(logoSrc)) {
  throw new Error(`Missing ${logoSrc} — add the horizontal wordmark SVG to public/`);
}
fs.mkdirSync(logoDestDir, { recursive: true });
fs.copyFileSync(logoSrc, logoDest);
console.log(`Logo synced → ${logoDest}`);

console.log(`Bricks import JSON synced → ${destDir}`);
