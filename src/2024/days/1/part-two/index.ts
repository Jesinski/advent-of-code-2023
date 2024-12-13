import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((line) => line.split("   "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const freq = new Map<string, number>();
for (const line of lines) {
  const currFreq = freq.get(line[1]) || 0;
  freq.set(line[1], currFreq + 1);
}
console.log(freq);
for (const line of lines) {
  const num = line[0];
  const frequency = freq.get(num) || 0;
  accumulator += +num * frequency;
}
console.log({ expectedResult: 0, result: accumulator });
