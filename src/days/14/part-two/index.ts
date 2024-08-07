import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
let matrix = inputFile.split("\n").map((e) => e.split(""));
let accumulator = 0;

const rows = matrix.length;
const columns = matrix[0].length;
const memo = new Map();
const times = 1000000000;
for (let cycle = 0; cycle < times; cycle++) {
  const key = getKey(matrix);
  if (cycle % 1000 == 0) {
    console.log("processing", cycle, "of", 1000000000);
  }
  if (memo.has(key)) {
    const memoized = memo.get(key);

    matrix = memoized[0];
    const length = cycle - memoized[1];
    const amount = Math.floor((times - cycle) / length);
    cycle += amount * length;
    continue;
  }
  console.log("processing....", cycle);
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

  // west
  for (let c = 1; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      if (matrix[r][c] == "O") {
        let offset = 1;
        while (c - offset >= 0 && matrix[r][c - offset] == ".") {
          matrix[r][c - offset] = "O";
          matrix[r][c - offset + 1] = ".";
          offset++;
        }
      }
    }
  }

  // south
  for (let r = rows - 2; r >= 0; r--) {
    for (let c = 0; c < columns; c++) {
      if (matrix[r][c] == "O") {
        let offset = 1;
        while (r + offset < rows && matrix[r + offset][c] == ".") {
          matrix[r + offset][c] = "O";
          matrix[r + offset - 1][c] = ".";
          offset++;
        }
      }
    }
  }

  // east
  for (let c = columns - 2; c >= 0; c--) {
    for (let r = 0; r < rows; r++) {
      if (matrix[r][c] == "O") {
        let offset = 1;
        while (c + offset < columns && matrix[r][c + offset] == ".") {
          matrix[r][c + offset] = "O";
          matrix[r][c + offset - 1] = ".";
          offset++;
        }
      }
    }
  }

  memo.set(key, [deepCopy(matrix), cycle]);
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    if (matrix[r][c] == "O") {
      accumulator += rows - r;
    }
  }
}
console.log({ expectedResult: 105606, result: accumulator });

function deepCopy(matrix: string[][]) {
  const output = [];

  for (const row of matrix) {
    output.push([...row]);
  }
  return output;
}
function getKey(matrix: string[][]) {
  const string = [];

  for (const row of matrix) {
    for (const char of row) {
      string.push(char);
    }
    string.push("\n");
  }

  return string.join("");
}
