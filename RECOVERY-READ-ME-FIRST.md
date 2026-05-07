# Site is down — manual fix required (~2 minutes)

**Status:** `wordpress-360579-6329136.cloudwaysapps.com` is showing a fatal PHP error.

**Cause:** I tried to append REST API exposure code to a theme file via PHP heredoc, and bash escaping mangled it. Site has been broken since. NovaMira MCP can't bootstrap to fix itself.

**Error:**
```
syntax error, unexpected token "\", expecting variable or "$"
file: wp-content/themes/profuzion-brick-child/includes/cpt-case-study.php
line: 42
```

## Fix (Cloudways File Manager, 2 min)

1. Cloudways console, app `wordpress-360579`, **Application Management, Application Settings, File Manager** (or SFTP).
2. Navigate to:
   `public_html/wp-content/themes/profuzion-brick-child/includes/cpt-case-study.php`
3. **Replace its entire contents** with the canonical version at:
   `E:\PFS\Projects\Cursor\project\tools\wordpress\profuzion-brick-child\includes\cpt-case-study.php`
   (37 lines, ends with `});`)
4. Save. Reload the homepage. Site comes back.

## After it's back

Wake me up (next message) and I'll:
- Resume case template polish vs. `/v6/work/brovek`
- Persist REST API ACF/featured-image exposure via the `functions.php` route instead of file-appending corrupted PHP
- Finish the pixel-perfect parity pass

I am NOT going to attempt another autonomous fix that touches PHP files via heredoc, that's the lesson here.
