import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

// 0 - 99
// start at 50
let dial = 50;
console.log("dial at", dial);
for (const line of lines) {
  const direction = line.slice(0, 1);
  const ticks = +line.slice(1);

  if (direction === "L") {
    dial = (dial - ticks) % 100;
  } else {
    dial = (dial + ticks) % 100;
  }

  if (Math.abs(dial) === 0) {
    accumulator++;
  }
  if (dial < 0) {
    dial = 100 - dial * -1;
  }

  console.log("dial at", dial);
}

console.log({ expectedResult: 6, result: accumulator });
