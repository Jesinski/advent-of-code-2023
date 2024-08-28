import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

const rucksacks = [];
for (let i = 0; i < lines.length; i += 3) {
  rucksacks.push(lines.slice(i, i + 3));
}
const A_CODE = "A".charCodeAt(0);
const a_CODE = "a".charCodeAt(0);

for (const [comp1, comp2, comp3] of rucksacks) {
  const c1 = new Set(comp1);
  const c2 = new Set(comp2);

  for (const item of comp3) {
    if (c1.has(item) && c2.has(item)) {
      if (item >= "a" && item <= "z") {
        accumulator += item.charCodeAt(0) - a_CODE + 1;
      } else {
        accumulator += item.charCodeAt(0) - A_CODE + 1 + 26;
      }
      break;
    }
  }
}
console.log({ expectedResult: 2758, result: accumulator });
