import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const lookupCycles = [20, 60, 100, 140, 180, 220];
let cycles = 0;
const stack: number[] = [1];
for (const line of lines) {
  const [op, val] = line;
  const qnt = op == "noop" ? 1 : 2;
  const nextCheck = lookupCycles[0];
  if (cycles + qnt > nextCheck) {
    accumulator += stack.reduce((acc, v) => acc + v, 0) * nextCheck;
    lookupCycles.shift();
  } else if (cycles + qnt == nextCheck) {
    accumulator += stack.reduce((acc, v) => acc + v, 0) * nextCheck;
    lookupCycles.shift();
  }
  cycles += qnt;
  if (op == "addx") {
    stack.push(+val);
  }
}

console.log({ expectedResult: 14240, result: accumulator });
