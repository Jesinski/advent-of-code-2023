import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(","));
// eslint-disable-next-line prefer-const
let accumulator = 0;

for (const [group1, group2] of lines) {
  const [g1l, g1h] = group1.split("-").map(Number);
  const [g2l, g2h] = group2.split("-").map(Number);

  if (g1h >= g2l && g1l <= g2h) {
    accumulator++;
  }
}
console.log({ expectedResult: 865, result: accumulator });
