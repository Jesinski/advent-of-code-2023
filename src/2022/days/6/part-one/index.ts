import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const line = inputFile.split("");

let accumulator = 0;
for (let i = 4; i < line.length; i++) {
  const letters = new Set(line.slice(i - 4, i));
  if (letters.size == 4) {
    accumulator = i;
    break;
  }
}

console.log({ expectedResult: 1760, result: accumulator });
