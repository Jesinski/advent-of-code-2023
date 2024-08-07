import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const matrix = inputFile.split("\n").map((e) => e.split(""));
let accumulator = 0;

const rows = matrix.length;
const columns = matrix[0].length;

for (let r = 1; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    if (matrix[r][c] == "O") {
      let offset = 1;
      while (r - offset >= 0 && matrix[r - offset][c] == ".") {
        matrix[r - offset][c] = "O";
        matrix[r - offset + 1][c] = ".";
        offset++;
      }
    }
  }
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    if (matrix[r][c] == "O") {
      accumulator += rows - r;
    }
  }
}

matrix.forEach((e) => console.log(e.join("")));
console.log({ expectedResult: 112048, result: accumulator });
