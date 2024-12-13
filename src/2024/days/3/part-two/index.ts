import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile;
// eslint-disable-next-line prefer-const
let accumulator = 0;

const regex = /mul\([0-9]+,[0-9]+\)|don't\(\)|do\(\)/g;
let active = true;
let result = regex.exec(lines);
while (result != null) {
  const entry = result[0];
  switch (entry) {
    case "don't()":
      active = false;
      break;
    case "do()":
      active = true;
      break;
    default: {
      if (active) {
        const numRegex = /[0-9]+/g;
        const n1 = +(numRegex.exec(entry) || 0);
        const n2 = +(numRegex.exec(entry) || 0);
        accumulator += n1 * n2;
      }
    }
  }
  result = regex.exec(lines);
}

console.log({ expectedResult: 0, result: accumulator });
