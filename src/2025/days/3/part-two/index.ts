import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

for (const line of lines) {
  const bank = line.split("").map((battery) => +battery);

  let maxNum = 0;
  for (let i = 0; i < bank.length; i++) {
    const left = bank[i];
    for (let j = i + 1; j < bank.length; j++) {
      const right = bank[j];

      const num = +`${left}${right}`;
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }
  console.log(maxNum);
  accumulator += maxNum;
}
console.log({ expectedResult: 17085, result: accumulator });
