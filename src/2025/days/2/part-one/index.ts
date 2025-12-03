import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split(",");
// eslint-disable-next-line prefer-const
let accumulator = 0;

for (const line of lines) {
  const [low, high] = line.split("-").map((n) => +n);

  for (let i = low; i <= high; i++) {
    const left = String(i).slice(0, String(i).length / 2);
    const right = String(i).slice(String(i).length / 2);

    if (left === right) {
      console.log(i);
      accumulator += i;
    }
  }
}

console.log({ expectedResult: 0, result: accumulator });
