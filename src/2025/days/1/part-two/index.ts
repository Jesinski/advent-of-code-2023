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
  let ticks = +line.slice(1);

  if (direction === "L") {
    while (ticks) {
      dial--;

      if (dial == -1) {
        dial = 99;
      }

      if (dial == 0) {
        accumulator++;
      }

      ticks--;
    }
  } else {
    while (ticks) {
      dial++;

      if (dial == 100) {
        dial = 0;
      }

      if (dial == 0) {
        accumulator++;
      }

      ticks--;
    }
  }

  console.log("dial at", dial);
}

console.log({ expectedResult: 6496, result: accumulator });
