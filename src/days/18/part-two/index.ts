import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((line) => line.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;
const inputs: [string, number][] = [];

for (const line of lines) {
  const hex = line[2].slice(1, line[2].length - 1);

  const units = parseInt(hex.slice(1, hex.length - 1), 16);
  const direction = +hex.slice(hex.length - 1);
  inputs.push(["RDLU"[direction], units]);
}
let prevRow = 0;
let prevCol = 0;
let area = 0;
for (const input of inputs) {
  const [dir, units] = input;
  let row = prevRow;
  let col = prevCol;
  switch (dir) {
    case "U":
      row = prevRow - units;
      break;
    case "D":
      row = prevRow + units;
      break;
    case "L":
      col = prevCol - units;
      break;
    case "R":
      col = prevCol + units;
      break;
  }
  area += prevCol * row - prevRow * col + units;
  prevRow = row;
  prevCol = col;
}
accumulator = area / 2 + 1;

console.log({ expectedResult: 60612092439765, result: accumulator });
