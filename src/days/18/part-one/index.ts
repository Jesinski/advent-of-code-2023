import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((line) => line.split(" "));

let maxRow = 0;
let minRow = 0;

let maxCol = 0;
let minCol = 0;

let currRow = 0;
let currCol = 0;
let accumulator = 0;

for (const line of lines) {
  const [dir, units] = line;
  accumulator += +units;
  switch (dir) {
    case "R":
      currCol += +units;
      maxCol = Math.max(maxCol, currCol);
      break;
    case "L":
      currCol -= +units;
      minCol = Math.min(minCol, currCol);
      break;
    case "U":
      currRow -= +units;
      minRow = Math.min(minRow, currRow);
      break;
    case "D":
      currRow += +units;
      maxRow = Math.max(maxRow, currRow);
      break;
  }
}

const m = maxRow + Math.abs(minRow) + 1;
const n = maxCol + Math.abs(minCol) + 1;
let r = Math.abs(minRow);
let c = Math.abs(minCol);
const toVisit = [[r + 1, c + 1]];
const matrix = new Array(m).fill([]).map(() => new Array(n).fill("."));

for (const line of lines) {
  const [dir, units] = line;
  let remainingUnits = +units;
  switch (dir) {
    case "R":
      while (remainingUnits) {
        c++;
        matrix[r][c] = "#";
        remainingUnits--;
      }
      break;
    case "L":
      while (remainingUnits) {
        c--;
        matrix[r][c] = "#";
        remainingUnits--;
      }
      break;
    case "U":
      while (remainingUnits) {
        r--;
        matrix[r][c] = "#";
        remainingUnits--;
      }
      break;
    case "D":
      while (remainingUnits) {
        r++;
        matrix[r][c] = "#";
        remainingUnits--;
      }
      break;
  }
}

const visited = new Set();
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
while (toVisit.length) {
  const node = toVisit.shift();
  if (!node) continue;

  const [row, column] = node;

  if (visited.has(node.join(","))) {
    continue;
  }
  visited.add(node.join(","));
  accumulator++;

  for (const [dx, dy] of directions) {
    const nr = row + dx;
    const nc = column + dy;

    if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
      if (matrix[nr][nc] == ".") {
        toVisit.push([nr, nc]);
      }
    }
  }
}

console.log({ expectedResult: 0, result: accumulator });
