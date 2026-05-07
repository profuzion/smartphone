import fs from "fs";
import path from "path";

const VAR_PAIRS = [
  ["--p-amber-glow", "--primary-glow"],
  ["--p-amber-2", "--primary-light"],
  ["--p-stone-mid", "--contrast-muted-mid"],
  ["--p-stone-low", "--contrast-muted-low"],
  ["--p-rule-on-ink", "--border-on-dark"],
  ["--p-rule-strong", "--border-strong"],
  ["--p-paper-low", "--base-mid"],
  ["--p-paper-2", "--base-light"],
  ["--p-paper-3", "--base-lighter"],
  ["--p-ink-2", "--secondary"],
  ["--p-ink-3", "--contrast-subtle"],
  ["--p-on-signal", "--on-primary"],
  ["--p-amber", "--primary"],
  ["--p-void", "--base-ultra-dark"],
  ["--p-paper", "--base"],
  ["--p-ink", "--contrast"],
  ["--p-stone", "--contrast-muted"],
  ["--p-rule", "--border"],
  ["--p-sans", "--text-sans"],
  ["--p-serif", "--text-serif"],
  ["--p-mono", "--text-mono"],
  ["--p-eo-strong", "--ease-out-strong"],
  ["--p-eo", "--ease-out"],
  ["--p-sage-2", "--sage-2"],
  ["--p-sage", "--sage"],
];

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts|css)$/.test(f.name)) acc.push(p);
  }
  return acc;
}

let n = 0;
for (const file of walk("src/app/v2")) {
  let c = fs.readFileSync(file, "utf8");
  for (const [a, b] of VAR_PAIRS) c = c.split(a).join(b);
  c = c.split("pfz-eyebrow--amber").join("pfz-eyebrow--primary");
  fs.writeFileSync(file, c);
  n += 1;
}
console.log("ACSS var migration:", n, "files");
