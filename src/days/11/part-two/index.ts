import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((line) => line.split(""));

const galaxies: [number, number][] = [];

const m = lines.length;
const n = lines[0].length;
const rowsWithGalaxies = new Set();
const columnsWithGalaxies = new Set();

for (let r = 0; r < m; r++) {
  for (let c = 0; c < n; c++) {
    if (lines[r][c] == "#") {
      galaxies.push([r, c]);
      rowsWithGalaxies.add(r);
      columnsWithGalaxies.add(c);
    }
  }
}
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let sum = 0;

// 28
for (const galaxy of galaxies) {
  const [gx, gy] = galaxy;
  const toVisit: [number, number, number][] = [[gx, gy, 0]];
  const visited = new Set();
  while (toVisit.length) {
    const visiting = toVisit.shift();
    if (!visiting) {
      continue;
    }
    const [row, column, steps] = visiting;
    const visitingKey = `${row},${column}`;
    if (visited.has(visitingKey)) {
      continue;
    }
    visited.add(visitingKey);

    if (lines[row][column] == "#") {
      sum += steps;
    }

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newColumn = column + dy;
      const key = `${newRow},${newColumn}`;
      if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
        if (!visited.has(key)) {
          let actualSteps = steps;
          if (dx != 0) {
            if (!rowsWithGalaxies.has(row)) {
              actualSteps += 1000000;
            } else {
              actualSteps += 1;
            }
          } else {
            if (!columnsWithGalaxies.has(column)) {
              actualSteps += 1000000;
            } else {
              actualSteps += 1;
            }
          }
          toVisit.push([newRow, newColumn, actualSteps]);
        }
      }
    }
  }
  lines[gx][gy] = ".";
}

console.log({ expectedResult: 0, result: sum });
