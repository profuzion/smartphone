/**
 * v6 homepage body Bricks JSON = v2 section machine import + setup note for Three/GSAP hooks.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildHomeContent } from "./lib/bricks-home-content.mjs";
import { makePack } from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../src/app/v6/profuzion-v6-bricks-home-import.json");

// Setup notes for halftone hooks live in tools/wordpress/BRICKS-DEPLOY-KIT-V6.md,
// not as a rendered section on the live homepage.

const pack = makePack(buildHomeContent());
writeFileSync(out, JSON.stringify(pack, null, 2), "utf8");
console.log("Wrote", out);
