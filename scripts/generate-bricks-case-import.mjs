/**
 * Writes case study Bricks JSON (Nature's Knoll sample) for v2 + v5 + v6 paths.
 *
 * @see src/app/v2/work/[slug]/page.tsx
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildCaseContent } from "./lib/bricks-case-content.mjs";
import { makePack } from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outV2 = join(__dirname, "../src/app/v2/profuzion-v2-bricks-case-import.json");
const outV5 = join(__dirname, "../src/app/v5/profuzion-v5-bricks-case-import.json");
const outV6 = join(__dirname, "../src/app/v6/profuzion-v6-bricks-case-import.json");

const pack = makePack(buildCaseContent());
const json = JSON.stringify(pack, null, 2);

writeFileSync(outV2, json, "utf8");
writeFileSync(outV5, json, "utf8");
writeFileSync(outV6, json, "utf8");
console.log("Wrote", outV2);
console.log("Wrote", outV5);
console.log("Wrote", outV6);
console.log("See tools/wordpress/BRICKS-DEPLOY-KIT-V6.md for v6 import + class mapping.");
