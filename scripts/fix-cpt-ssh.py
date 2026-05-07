"""One-shot SSH fix: SCP canonical cpt-case-study.php over corrupted remote copy."""
import json, sys, os, paramiko
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCAL = ROOT / "tools/wordpress/profuzion-brick-child/includes/cpt-case-study.php"
REMOTE = "/home/master/applications/mmjwnfjucw/public_html/wp-content/themes/profuzion-brick-child/includes/cpt-case-study.php"

mcp = json.loads((ROOT / ".mcp.json").read_text())
srv = next(iter(mcp["mcpServers"].values()))
PASS = srv["env"]["WP_API_PASSWORD"]
USER = "lowell@profuzionstudio.com"
HOST = "159.203.36.162"
PORT = 22

print(f"connecting {USER}@{HOST}:{PORT} ...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    ssh.connect(HOST, port=PORT, username=USER, password=PASS, timeout=15, allow_agent=False, look_for_keys=False)
except Exception as e:
    print("AUTH FAIL:", e)
    sys.exit(2)
print("connected.")

sftp = ssh.open_sftp()
# back up corrupted
try:
    sftp.rename(REMOTE, REMOTE + ".broken")
    print("renamed corrupted to .broken")
except Exception as e:
    print("rename skipped:", e)

sftp.put(str(LOCAL), REMOTE)
print("uploaded canonical file")
attrs = sftp.stat(REMOTE)
print(f"remote size: {attrs.st_size}  (local size: {LOCAL.stat().st_size})")
sftp.close()
ssh.close()
print("done.")
