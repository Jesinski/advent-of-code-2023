import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");
let accumulator = 0;

for (const line of lines) {
  const rows: number[][] = [];
  const numbers = line.split(" ").map((num) => +num);
  rows.push(numbers);

  while (!rows[rows.length - 1].every((value) => value === 0)) {
    const nextLine: number[] = [];
    for (let i = 0; i < rows[rows.length - 1].length - 1; i++) {
      nextLine.push(rows[rows.length - 1][i + 1] - rows[rows.length - 1][i]);
    }
    rows.push(nextLine);
  }

  let sum = 0;
  for (let i = rows.length - 1; i >= 0; i--) {
    sum = rows[i][0] - sum;
  }
  accumulator += sum;
}
console.log({ expectedResult: 884, result: accumulator });
