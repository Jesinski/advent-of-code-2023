import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] == "") {
    accumulator = Math.max(accumulator, sum);
    sum = 0;
  } else {
    sum += +lines[i];
  }
}
accumulator = Math.max(accumulator, sum);

console.log({ expectedResult: 74394, result: accumulator });
