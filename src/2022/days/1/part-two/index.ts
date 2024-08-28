import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;
const elfs = [];

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") {
    elfs.push(sum);
    sum = 0;
  } else {
    sum += +lines[i];
  }
}
elfs.push(sum);

accumulator = elfs
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log({ expectedResult: 0, result: accumulator });
