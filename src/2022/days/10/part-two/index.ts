import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const

let cycles = 0;
let x = 1;
let row = -1;
const crt = new Array(6).fill([]).map(() => new Array(40).fill("."));

for (const line of lines) {
  if (cycles % 40 == 0) {
    row++;
  }
  if (cycles % 40 >= x - 1 && cycles % 40 <= x + 1) {
    crt[row][cycles % 40] = "#";
  }
  const [op, val] = line;
  cycles++;
  if (op == "addx") {
    if (cycles % 40 == 0) {
      row++;
    }
    if (cycles % 40 >= x - 1 && cycles % 40 <= x + 1) {
      crt[row][cycles % 40] = "#";
    }
    cycles++;
    x += +val;
  }
}
for (const line of crt) {
  console.log(line.join(""));
}
console.log({ expectedResult: "PLULKBZH", result: "PLULKBZH" });
