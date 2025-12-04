import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const grid = inputFile.split("\n").map((r) => r.split(""));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const POSITIONS = [
  [-1, -1],
  [-1, 1],
  [-1, 0],
  [1, -1],
  [1, 1],
  [1, 0],
  [0, -1],
  [0, 1],
];

const markedNodes: [number, number][] = [];

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    let rolls = 0;

    if (grid[i][j] === ".") {
      continue;
    }

    for (const [x, y] of POSITIONS) {
      if (grid[i + x]?.[j + y] === "@") {
        rolls++;
      }
    }

    console.log("rolls", rolls);
    if (rolls < 4) {
      markedNodes.push([i, j]);
      accumulator++;
    }
  }
}

for (const [x, y] of markedNodes) {
  grid[x][y] = "X";
}

for (let i = 0; i < grid.length; i++) {
  console.log(grid[i].join(""));
}

console.log({ expectedResult: 0, result: accumulator });
