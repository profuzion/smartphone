/**
 * Copies GSAP + ScrollTrigger from installed packages and downloads the UMD three.min.js
 * build (pinned) into the child theme — WordPress loads JS only from wp-content when possible.
 *
 * Requires: locked dependencies installed in the project. Network once for Three UMD (jsDelivr).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const vendorDir = path.join(
  repoRoot,
  "tools/wordpress/profuzion-brick-child/assets/js/vendor",
);

/** r149 UMD avoids console deprecation spam from three ≥ r150 (“build/three.min.js” legacy bundle path). */
const THREE_UMD_URL =
  "https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js";

function copyFile(relSrc, destName) {
  const from = path.join(repoRoot, relSrc);
  if (!fs.existsSync(from)) {
    throw new Error(`sync-wp-vendor-js: missing ${relSrc} — install project dependencies`);
  }
  const to = path.join(vendorDir, destName);
  fs.copyFileSync(from, to);
  console.log("copied", destName);
}

async function download(url, destName) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`sync-wp-vendor-js: ${url} → ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const to = path.join(vendorDir, destName);
  fs.writeFileSync(to, buf);
  console.log("downloaded", destName, `(${buf.length} bytes)`);
}

fs.mkdirSync(vendorDir, { recursive: true });

copyFile("node_modules/gsap/dist/gsap.min.js", "gsap.min.js");
copyFile("node_modules/gsap/dist/ScrollTrigger.min.js", "ScrollTrigger.min.js");
await download(THREE_UMD_URL, "three.min.js");

const notice = `/* Vendor JS mirrored by sync-wp-vendor-js — load only from child theme on WordPress. */

GSAP + ScrollTrigger: see the "gsap" package LICENSE in your dependency tree.
Three.js r149 UMD: MIT — https://github.com/mrdoob/three.js
`;
fs.writeFileSync(path.join(vendorDir, "README.txt"), notice);
console.log("wrote vendor README.txt");
