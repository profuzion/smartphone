/**
 * Writes homepage body JSON (no header/footer — use v5 header/footer imports).
 * - src/app/v2/profuzion-v2-bricks-import.json (legacy path)
 * - src/app/v5/profuzion-v5-bricks-home-import.json
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildHomeContent } from "./lib/bricks-home-content.mjs";
import { makePack } from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outV2 = join(__dirname, "../src/app/v2/profuzion-v2-bricks-import.json");
const outV5 = join(__dirname, "../src/app/v5/profuzion-v5-bricks-home-import.json");

const pack = makePack(buildHomeContent());
const json = JSON.stringify(pack, null, 2);

writeFileSync(outV2, json, "utf8");
writeFileSync(outV5, json, "utf8");
console.log("Wrote", outV2);
console.log("Wrote", outV5);
