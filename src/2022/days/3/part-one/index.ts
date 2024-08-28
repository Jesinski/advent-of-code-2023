import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

const rucksacks = lines.map((e) => [
  e.slice(0, e.length / 2),
  e.slice(e.length / 2),
]);

const A_CODE = "A".charCodeAt(0);
const a_CODE = "a".charCodeAt(0);

for (const [comp1, comp2] of rucksacks) {
  const c1 = new Set(comp1);
  for (const item of comp2) {
    if (c1.has(item)) {
      if (item >= "a" && item <= "z") {
        accumulator += item.charCodeAt(0) - a_CODE + 1;
      } else {
        accumulator += item.charCodeAt(0) - A_CODE + 1 + 26;
      }
      break;
    }
  }
}
console.log({ expectedResult: 7553, result: accumulator });
