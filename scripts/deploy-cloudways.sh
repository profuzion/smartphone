#!/usr/bin/env bash
# Bash cannot run .ps1 files. Use this wrapper from Git Bash / WSL, or run PowerShell directly:
#   pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/deploy-cloudways.ps1
#   powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/deploy-cloudways.ps1

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PS1_FILE="${SCRIPT_DIR}/deploy-cloudways.ps1"

if [[ ! -f "$PS1_FILE" ]]; then
	echo "Missing: $PS1_FILE" >&2
	exit 1
fi

if command -v pwsh >/dev/null 2>&1; then
	exec pwsh -NoProfile -ExecutionPolicy Bypass -File "$PS1_FILE" "$@"
fi

if command -v powershell.exe >/dev/null 2>&1; then
	exec powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$PS1_FILE" "$@"
fi

WSL_PS="/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe"
if [[ -x "$WSL_PS" ]]; then
	WIN_FILE="$PS1_FILE"
	if command -v wslpath >/dev/null 2>&1; then
		WIN_FILE="$(wslpath -w "$PS1_FILE")"
	fi
	exec "$WSL_PS" -NoProfile -ExecutionPolicy Bypass -File "$WIN_FILE" "$@"
fi

echo "Install PowerShell 7 (pwsh) or use Windows powershell.exe to run deploy-cloudways.ps1." >&2
exit 127
