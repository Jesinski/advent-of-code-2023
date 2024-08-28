import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const line = inputFile.split("");

let accumulator = 0;
for (let i = 14; i < line.length; i++) {
  const letters = new Set(line.slice(i - 14, i));
  if (letters.size == 14) {
    accumulator = i;
    break;
  }
}

console.log({ expectedResult: 2974, result: accumulator });
