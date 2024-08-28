import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const matrix = inputFile.split("\n").map((v) => v.split(""));
// eslint-disable-next-line prefer-const
let accumulator = 0;
let source: [number, number] = [-1, -1];
const rows = matrix.length;
const cols = matrix[0].length;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (matrix[r][c] == "S") {
      source = [r, c];
      matrix[r][c] = ".";
      break;
    }
  }
  if (source[0] != -1) {
    break;
  }
}
const STEPS = 64;
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const toVisit: [number, number, number][] = [[...source, 0]];
const finalPos: Set<string> = new Set();
const visited = new Set();

while (toVisit.length) {
  const node = toVisit.shift();
  if (!node) {
    continue;
  }

  const [row, col, steps] = node;
  if (steps > STEPS) {
    continue;
  }
  if (visited.has(`${row},${col}`)) {
    continue;
  }
  if (steps % 2 == STEPS % 2) {
    finalPos.add(`${row},${col}`);
    accumulator++;
  }
  visited.add(`${row},${col}`);
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      matrix[newRow][newCol] == "."
    ) {
      toVisit.push([row + dx, col + dy, steps + 1]);
    }
  }
}

for (const pos of finalPos) {
  const [row, col] = pos.split(",");
  matrix[+row][+col] = "O";
}

for (const row of matrix) {
  console.log(row.join(""));
}

console.log({ expectedResult: 3637, result: accumulator });
