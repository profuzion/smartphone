#Requires -Version 5.1
<#
  Deploy to a server over SSH (copy after building).

  1) One-time: create a deploy key
     ssh-keygen -t ed25519 -C "profuzion-deploy" -f "$env:USERPROFILE\.ssh\id_ed25519_profuzion"
     # On the server, append the .pub to ~/.ssh/authorized_keys for your deploy user
     # Or: scp  "$env:USERPROFILE\.ssh\id_ed25519_profuzion.pub" user@host:/tmp/ && ssh user@host "mkdir -p .ssh; cat /tmp/*.pub >> .ssh/authorized_keys"

  2) Optional: C:\Users\<you>\.ssh\config
     Host mysite
         HostName 203.0.113.10
         User deploy
         IdentityFile ~/.ssh/id_ed25519_profuzion
         IdentitiesOnly yes

  3) Copy this file to deploy-over-ssh.ps1, fill the variables, run from project root.
     (deploy-over-ssh.ps1 is gitignored so you can put real hosts there.)

  Next.js: either upload a static export (out/) or build on the server. This script
  syncs a local folder to a remote path — adjust $LocalSource to match your process.
#>

$ErrorActionPreference = "Stop"

# --- set these (or copy to deploy-over-ssh.ps1) ---
$RemoteHost = "mysite"   # or user@IP from ssh config; see Host above
$RemotePath = "/var/www/html"   # must exist; trailing slash not required
# Folder to upload after build, e.g. "out" for `next build` with static export
$LocalSource = Join-Path (Split-Path $PSScriptRoot -Parent) "out"

# --- build (optional) ---
# Set-Location (Join-Path $PSScriptRoot ".."); npm run build; Set-Location $PSScriptRoot

if (-not (Test-Path $LocalSource)) {
  Write-Error "Local folder not found: $LocalSource — run a static build first or change `$LocalSource."
}

Write-Host "Uploading $LocalSource to ${RemoteHost}:$RemotePath"
# Recursively copy folder contents; remote path is usually a directory that already exists
& scp -r "$LocalSource\*" "${RemoteHost}:$RemotePath/"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Done."
