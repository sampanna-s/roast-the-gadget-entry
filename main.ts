import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "My microwave beeps every thirty seconds until I open it, like it's filing a missing-person report for my lunch.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
// Gate mirror from RULES.txt: UTF-8 text, 1-200 characters, not only whitespace,
// a single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}
fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, "entry.txt");
const tmp = target + ".tmp-" + process.pid;
fs.writeFileSync(tmp, LINE + "\n", "utf8");
fs.renameSync(tmp, target);
