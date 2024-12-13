import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
let accumulator = 0;
const lines = inputFile.split("\n").map((line) => line.split("   "));

const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
  left.push(+line[0]);
  right.push(+line[1]);
}
console.log(lines);
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
  accumulator += Math.abs(left[i] - right[i]);
}
// eslint-disable-next-line prefer-const
console.log({ expectedResult: 0, result: accumulator });
