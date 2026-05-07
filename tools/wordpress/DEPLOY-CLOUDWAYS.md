# Deploy v2 child theme to Cloudways (SSH / SCP)

This deploys **only the WordPress piece**: **`profuzion-brick-child`** (CSS, JS, CPT, ACF JSON).  
It does **not** install Bricks, ACSS, or WordPress — do that in wp-admin first.

---

## Before you run

1. From the repo root (where `package.json` lives), run **`npm run wp:handoff`** so CSS, vendor JS, and Bricks exports are current.

   ```powershell
   cd E:\PFS\Projects\Cursor\project
   npm run wp:handoff
   ```

2. On Cloudways, note from **Servers → Master Credentials**:
   - **Public IP** (or SSH host)
   - **Username** (e.g. `master_xxxxx`)
   - **SSH port** (not 22)

3. Find **WordPress root** on the server: path to the folder that contains **`wp-config.php`**.  
   Often looks like:

   `/home/master/applications/<something>/public_html`

   Check **Application → Access Details** in Cloudways if unsure.

4. Windows: ensure **OpenSSH Client** is installed (Optional Features).

---

## One-command deploy (PowerShell)

From **`E:\PFS\Projects\Cursor\project`** (edit values):

```powershell
.\scripts\deploy-cloudways.ps1 `
  -SshHost "YOUR_SERVER_IP" `
  -SshPort YOUR_SSH_PORT `
  -SshUser "YOUR_MASTER_USER" `
  -RemotePublicHtml "/home/master/applications/YOUR_APP_FOLDER/public_html"
```

Optional — also upload Bricks JSON to **`wp-content/uploads/profuzion-handoff/`**:

```powershell
.\scripts\deploy-cloudways.ps1 `
  -SshHost "YOUR_SERVER_IP" `
  -SshPort YOUR_SSH_PORT `
  -SshUser "YOUR_MASTER_USER" `
  -RemotePublicHtml "/home/master/applications/YOUR_APP_FOLDER/public_html" `
  -UploadBricksJson
```

Dry run (prints intent; with `-Confirm` you can step through):

```powershell
.\scripts\deploy-cloudways.ps1 ... -WhatIf
```

---

## After deploy

1. **wp-admin → Appearance → Themes** — activate **Profuzion (Bricks child)** (Bricks parent must be installed).
2. **Settings → Permalinks → Save** (flush rules).
3. **Custom Fields** — sync **Profuzion — Case study** (ACF JSON in theme).
4. **Bricks** — import JSON from your PC or from `uploads/profuzion-handoff/` if you used `-UploadBricksJson`.
5. Continue **`BRICKS-DEPLOY-KIT.md`** from the Bricks / class-mapping steps.

---

## No SSH? Use ZIP

Create a zip of the theme folder in Explorer, or:

```powershell
Compress-Archive -Path "E:\PFS\Projects\Cursor\project\tools\wordpress\profuzion-brick-child" -DestinationPath "$env:USERPROFILE\Desktop\profuzion-brick-child.zip" -Force
```

Upload via **Cloudways SFTP** or **wp-admin → Appearance → Themes → Add → Upload** (if your plan allows).

---

## Security

Do **not** commit real hosts, users, or passwords to git. Use SSH keys where possible ([Cloudways SSH keys](https://support.cloudways.com/en/articles/5120983-how-to-connect-to-your-application-using-ssh)).
