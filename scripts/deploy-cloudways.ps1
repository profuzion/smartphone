#Requires -Version 5.1
<#
.SYNOPSIS
  Deploy Profuzion v2 WordPress child theme to Cloudways over SSH.

.DESCRIPTION
  1. Removes old remote folder: {RemotePublicHtml}/wp-content/themes/profuzion-brick-child
  2. Builds a local .tar from tools/wordpress/profuzion-brick-child (Windows bsdtar), uploads with scp using only a
     relative local filename (no Drive: in argv — avoids Win32-OpenSSH parsing bugs), staging the tarball in the
     SSH user's home directory resolved with ssh (printf `$HOME), then extracts with GNU tar.
     Avoids tar|ssh piping (binary corruption; PowerShell can corrupt stdin).

  3. By default, after upload, runs WP-CLI over SSH: activate child theme, flush rewrites, ACF JSON sync (if ACF active),
     wp profuzion import-bricks (requires bundled bricks-import/ in theme from npm run wp:handoff), wp bricks regenerate_assets (ignored if unsupported).
     Use -SkipAutoFinalize or env CW_DEPLOY_SKIP_AUTO_FINALIZE=1 to upload only.

  Prerequisite: OpenSSH Client on Windows (Settings → Apps → Optional features → OpenSSH Client).
  Credentials: Cloudways Servers - Master Credentials (SSH user, IP, SSH port).
  Remote path: Cloudways Applications / Access Details - WordPress root is usually
    .../public_html  (folder that contains wp-config.php).

.PARAMETER RemotePublicHtml
  Absolute POSIX path on the server to WordPress root, e.g.
  /home/master/applications/yourappfolder/public_html

.PARAMETER UploadBricksJson
  Also uploads Bricks JSON packs to wp-content/uploads/profuzion-handoff/ for easy download from Media or direct URL.

.PARAMETER PreserveHandoffFolder
  If set with UploadBricksJson, do not rm -rf profuzion-handoff before uploading (default: wipe folder for a clean v2 replacement).

.PARAMETER SkipAutoFinalize
  Do not run remote WP-CLI (theme activation, permalinks, ACF sync, Bricks import). Use for upload-only runs.

.PARAMETER WhatIf
  Print commands only; do not connect.

  Optional env (avoid pasting secrets in commands that get logged):
    CW_DEPLOY_SSH_HOST, CW_DEPLOY_SSH_PORT, CW_DEPLOY_SSH_USER, CW_DEPLOY_REMOTE_PUBLIC_HTML,
    CW_DEPLOY_REMOTE_SCRATCH_DIR (optional writable POSIX dir for upload .tar; default = remote `$HOME from ssh)
    CW_DEPLOY_SKIP_AUTO_FINALIZE    1 / true / yes = same as -SkipAutoFinalize

  Or copy scripts/deploy-cloudways.local.ps1.example → scripts/deploy-cloudways.local.ps1 (gitignored), fill values, then run the script.

.EXAMPLE
  .\scripts\deploy-cloudways.ps1 `
    -SshHost "203.0.113.50" `
    -SshPort 28222 `
    -SshUser "master_abcd1234" `
    -RemotePublicHtml "/home/master/applications/abcd12345/public_html"
.EXAMPLE
  $env:CW_DEPLOY_SSH_HOST='203.0.113.50'; $env:CW_DEPLOY_SSH_PORT='28222'; $env:CW_DEPLOY_SSH_USER='master_x'; $env:CW_DEPLOY_REMOTE_PUBLIC_HTML='/home/master/applications/ab/public_html'; .\scripts\deploy-cloudways.ps1 -UploadBricksJson
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'None')]
param(
  [Parameter(Mandatory = $false)]
  [string] $SshHost,

  # Use -1 to mean “not supplied”; resolve from CW_DEPLOY_SSH_PORT env if omitted.
  [Parameter(Mandatory = $false)]
  [ValidateRange(-1, 65535)]
  [int] $SshPort = -1,

  [Parameter(Mandatory = $false)]
  [string] $SshUser,

  [Parameter(Mandatory = $false)]
  [string] $RemotePublicHtml,

  [switch] $UploadBricksJson,

  [switch] $PreserveHandoffFolder,

  [switch] $SkipAutoFinalize
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$localProfile = Join-Path $PSScriptRoot "deploy-cloudways.local.ps1"
if (Test-Path -LiteralPath $localProfile) {
  . $localProfile
}

if (-not $SshHost) { $SshHost = $env:CW_DEPLOY_SSH_HOST }
if (-not $SshUser) { $SshUser = $env:CW_DEPLOY_SSH_USER }
if (-not $RemotePublicHtml) { $RemotePublicHtml = $env:CW_DEPLOY_REMOTE_PUBLIC_HTML }
if ($SshPort -lt 0 -and $env:CW_DEPLOY_SSH_PORT) {
  try { $SshPort = [int][string]$env:CW_DEPLOY_SSH_PORT } catch { throw "CW_DEPLOY_SSH_PORT must be an integer." }
}

if (
  [string]::IsNullOrWhiteSpace($SshHost) -or
  [string]::IsNullOrWhiteSpace($SshUser) -or
  [string]::IsNullOrWhiteSpace($RemotePublicHtml) -or
  $SshPort -lt 1
) {
  throw @"
Missing SSH deploy target. Pass parameters or set environment variables in this shell (do not commit):

  CW_DEPLOY_SSH_HOST              e.g. 203.0.113.50
  CW_DEPLOY_SSH_PORT              e.g. 28222
  CW_DEPLOY_SSH_USER              e.g. master_abcd1234
  CW_DEPLOY_REMOTE_PUBLIC_HTML    POSIX path to WordPress root (.../public_html)

Then run again: .\scripts\deploy-cloudways.ps1 [-UploadBricksJson] [-SkipAutoFinalize]

Or create scripts\deploy-cloudways.local.ps1 from deploy-cloudways.local.ps1.example (see repo .gitignore).
"@
}

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$ThemeLocal = Join-Path $RepoRoot "tools\wordpress\profuzion-brick-child"

$runFinalize = -not $SkipAutoFinalize
if ($env:CW_DEPLOY_SKIP_AUTO_FINALIZE -match '^(1|true|yes)$') {
  $runFinalize = $false
}

if (-not (Test-Path (Join-Path $ThemeLocal "style.css"))) {
  throw "Child theme not found. Expected: $ThemeLocal"
}

$RemotePublicHtml = $RemotePublicHtml.TrimEnd("/")
$remoteThemes = "$RemotePublicHtml/wp-content/themes"
$remoteThemeDir = "$remoteThemes/profuzion-brick-child"
$childThemeSlug = 'profuzion-brick-child'

# user@domain style logins need ssh -l / scp User= — avoid user@host@host ambiguity
$sshStrict = @("-o", "StrictHostKeyChecking=accept-new")
if ($SshUser.Contains('@')) {
  $sshBase = @("-p", "$SshPort") + $sshStrict + @("-l", $SshUser, $SshHost)
  $scpOpts = @("-P", "$SshPort") + $sshStrict + @("-o", "User=$SshUser")
  $scpDestPrefix = "${SshHost}:"
}
else {
  $sshTarget = "${SshUser}@${SshHost}"
  $sshBase = @("-p", "$SshPort") + $sshStrict + @($sshTarget)
  $scpOpts = @("-P", "$SshPort") + $sshStrict
  $scpDestPrefix = "${sshTarget}:"
}

function Get-RepoRelativePosixPath {
  param(
    [Parameter(Mandatory = $true)][string] $RepoRootFull,
    [Parameter(Mandatory = $true)][string] $AbsolutePath
  )
  $base = [IO.Path]::GetFullPath($RepoRootFull).TrimEnd('\')
  $full = [IO.Path]::GetFullPath($AbsolutePath)
  if (-not $full.StartsWith($base, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Path not under repo root: $AbsolutePath"
  }
  ($full.Substring($base.Length).TrimStart('\') -replace '\\', '/')
}

$repoFull = [IO.Path]::GetFullPath([string]$RepoRoot)

Write-Host "Repo:        $RepoRoot"
Write-Host "Local theme: $ThemeLocal"
Write-Host "Remote:      $remoteThemeDir"
Write-Host ""

if ($PSCmdlet.ShouldProcess($remoteThemes, 'upload child theme (staged tar + scp)')) {
  $tarExe = Join-Path $env:SystemRoot "System32\tar.exe"
  if (-not (Test-Path -LiteralPath $tarExe)) {
    throw "Windows tar.exe not found at $tarExe (need built-in bsdtar, Windows 10+)."
  }

  $bundleName = "profuzion-brick-deploy.tar"
  $stagingAbs = Join-Path $env:TEMP ("pfzb-{0}-{1}" -f ([Guid]::NewGuid().ToString('n'), $bundleName))
  $themeParentRel = Join-Path $RepoRoot "tools\wordpress"
  $tarName = "pfzb-deploy-$([Guid]::NewGuid().ToString('n')).tar"
  $scratchRaw = $env:CW_DEPLOY_REMOTE_SCRATCH_DIR
  if ([string]::IsNullOrWhiteSpace($scratchRaw)) {
    # Resolve real home over SSH — scp/SFTP often mishandles ~/ or /home/master on some hosts.
    $remoteHome = (& ssh @sshBase 'printf %s "$HOME"').Trim()
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remoteHome)) {
      throw "Could not read remote `$HOME over ssh (exit $LASTEXITCODE). Set CW_DEPLOY_REMOTE_SCRATCH_DIR to a writable POSIX path."
    }
    $remoteScpPath = "$remoteHome/$tarName"
    $remoteTarExtractPath = $remoteScpPath
  }
  else {
    $scratchDir = $scratchRaw.Trim().TrimEnd('/')
    & ssh (@($sshBase) + @("mkdir -p ""$scratchDir"""))
    if ($LASTEXITCODE -ne 0) { throw "ssh mkdir scratch dir failed (exit $LASTEXITCODE): $scratchDir" }
    $remoteScpPath = "$scratchDir/$tarName"
    $remoteTarExtractPath = $remoteScpPath
  }

  Push-Location $themeParentRel
  try {
    # Prefer posix format (GNU-friendly). Fall back to default if unsupported.
    if (Test-Path -LiteralPath $stagingAbs) { Remove-Item -LiteralPath $stagingAbs -Force }
    & $tarExe '-cf' $stagingAbs '--format' 'posix' 'profuzion-brick-child'
    if ($LASTEXITCODE -ne 0) {
      if (Test-Path -LiteralPath $stagingAbs) { Remove-Item -LiteralPath $stagingAbs -Force }
      & $tarExe '-cf' $stagingAbs 'profuzion-brick-child'
      if ($LASTEXITCODE -ne 0) { throw "local tar create failed (exit $LASTEXITCODE)." }
    }
    if (-not (Test-Path -LiteralPath $stagingAbs)) {
      throw 'Staging tar missing after tar -cf.'
    }

    # Windows OpenSSH: paths with "C:..." or //127.0.0.1/c$/... often break scp. Use cwd + leaf name only.
    $tarParent = Split-Path -Parent $stagingAbs
    $tarLeaf = Split-Path -Leaf $stagingAbs

    Push-Location $tarParent
    try {
      & scp @scpOpts $tarLeaf ("${scpDestPrefix}$remoteScpPath")
      if ($LASTEXITCODE -ne 0) {
        throw @"
scp upload failed (exit $LASTEXITCODE). Local file was sent as relative name from $tarParent (no drive letter).
Remote scp path: $remoteScpPath
Default uses the path printed by remote printf HOME over ssh. If uploads still fail, set CW_DEPLOY_REMOTE_SCRATCH_DIR to a writable POSIX directory (the script runs mkdir -p there first).
"@
      }
    }
    finally {
      Pop-Location
    }

    $extractCmd = "mkdir -p ""$remoteThemes"" && rm -rf ""$remoteThemeDir"" && tar xf ""$remoteTarExtractPath"" -C ""$remoteThemes"" && rm -f ""$remoteTarExtractPath"""
    & ssh (@($sshBase) + @($extractCmd))
    if ($LASTEXITCODE -ne 0) {
      throw "ssh extract failed (exit $LASTEXITCODE). Remote tar may remain at $remoteTarExtractPath - remove manually."
    }
  }
  finally {
    Pop-Location
    Remove-Item -LiteralPath $stagingAbs -Force -ErrorAction SilentlyContinue
  }
}

if ($UploadBricksJson) {
  $handoff = "$RemotePublicHtml/wp-content/uploads/profuzion-handoff"
  $j1 = Join-Path $RepoRoot "src\app\v2\profuzion-v2-bricks-import.json"
  if (-not (Test-Path $j1)) { throw "Missing $j1 - run npm run wp:handoff" }

  if (-not $PreserveHandoffFolder -and $PSCmdlet.ShouldProcess($handoff, "Remove prior handoff uploads (clean v2)")) {
    & ssh @sshBase "rm -rf ""$handoff"""
  }

  if ($PSCmdlet.ShouldProcess($handoff, 'mkdir + upload Bricks JSON (scp relative local paths)')) {
    & ssh @sshBase "mkdir -p ""$handoff"""
    $jf1 = [IO.Path]::GetFullPath((Join-Path $RepoRoot 'src\app\v2\profuzion-v2-bricks-import.json'))
    $jf2 = [IO.Path]::GetFullPath((Join-Path $RepoRoot 'src\app\v2\profuzion-v2-bricks-case-import.json'))
    foreach ($jf in @( $jf1, $jf2 )) {
      if (-not (Test-Path -LiteralPath $jf)) {
        throw "Missing Bricks JSON: $jf - run npm run wp:handoff"
      }
    }
    $rel1 = Get-RepoRelativePosixPath -RepoRootFull $repoFull -AbsolutePath $jf1
    $rel2 = Get-RepoRelativePosixPath -RepoRootFull $repoFull -AbsolutePath $jf2
    Push-Location $RepoRoot
    try {
      & scp @scpOpts $rel1 ("${scpDestPrefix}$handoff/profuzion-v2-bricks-import.json")
      if ($LASTEXITCODE -ne 0) { throw "scp Bricks homepage JSON failed (exit $LASTEXITCODE)." }
      & scp @scpOpts $rel2 ("${scpDestPrefix}$handoff/profuzion-v2-bricks-case-import.json")
      if ($LASTEXITCODE -ne 0) { throw "scp Bricks case JSON failed (exit $LASTEXITCODE)." }
    }
    finally {
      Pop-Location
    }
  }
  Write-Host "Bricks JSON uploaded to: $handoff/"
}

if ($runFinalize -and $PSCmdlet.ShouldProcess($RemotePublicHtml, 'WP-CLI: activate theme, flush rewrites, ACF sync, profuzion import-bricks')) {
  $wpSh = @"
set -e
cd ""$RemotePublicHtml""
command -v wp >/dev/null 2>&1 || { echo 'WP-CLI (wp) not found in PATH on server. Install it or use -SkipAutoFinalize.' >&2; exit 127; }
wp theme activate ""$childThemeSlug""
wp rewrite flush
if wp plugin is-active advanced-custom-fields >/dev/null 2>&1 || wp plugin is-active advanced-custom-fields-pro >/dev/null 2>&1 || wp plugin is-active acf >/dev/null 2>&1; then
  wp acf json sync --type=field-group || echo 'wp acf json sync exited non-zero; sync field groups in ACF admin if needed.' >&2
else
  echo 'ACF plugin not active; skipped wp acf json sync.' >&2
fi
wp profuzion import-bricks
wp bricks regenerate_assets 2>/dev/null || true
echo ''
echo '=== Deploy verification (read this output) ==='
wp theme list --status=active --fields=name,status
wp post list --post_type=bricks_template --post_status=publish --fields=post_name,post_title --format=table
echo 'If the table is empty, Bricks templates did not import — see Bricks → Templates in wp-admin and tools/wordpress README.'
"@
  & ssh @sshBase $wpSh
  if ($LASTEXITCODE -ne 0) {
    throw "WP-CLI finalize failed (exit $LASTEXITCODE). Try: ssh ... `"cd $RemotePublicHtml && wp cli info`""
  }
}

Write-Host ""
if ($runFinalize) {
  Write-Host 'WP-CLI finalize ran: theme, rewrites, ACF sync (if ACF active), profuzion import-bricks, bricks regenerate_assets (if available).'
  Write-Host 'Templates are wired via bricks/active_templates when slugs pfz-v9-* exist (see profuzion-brick-child/includes/bricks-auto-templates.php).'
  Write-Host 'Set Settings > Reading > static homepage so pfz-v9-home applies when that page has no Bricks body content.'
}
else {
  Write-Host 'Skipped auto-finalize (-SkipAutoFinalize / CW_DEPLOY_SKIP_AUTO_FINALIZE). Run wp theme activate, wp rewrite flush, wp profuzion import-bricks on the server if needed.'
}
