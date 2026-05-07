/**
 * v10 homepage Bricks JSON — same semantic tree as v2/v5/v6, tagged for native-first imports.
 * Uses shared generators (`buildHomeContent`) after `textBasic` → Bricks `text` fix (see bricks-elements.mjs).
 *
 * Outputs:
 * - src/app/v10/profuzion-v10-bricks-import.json       (canonical body pack)
 * - src/app/v10/profuzion-v10-bricks-home-import.json   (alias for template workflows)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildHomeContent } from "./lib/bricks-home-content.mjs";
import { makePack } from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "../src/app/v10");
mkdirSync(dir, { recursive: true });

const pack = makePack(buildHomeContent());
const json = JSON.stringify(pack, null, 2);

const outMain = join(dir, "profuzion-v10-bricks-import.json");
const outHome = join(dir, "profuzion-v10-bricks-home-import.json");

writeFileSync(outMain, json, "utf8");
writeFileSync(outHome, json, "utf8");
console.log("Wrote", outMain);
console.log("Wrote", outHome);
