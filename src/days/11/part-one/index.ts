import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const grid: string[][] = [];

for (const line of lines) {
  const row = [...line.split("")];
  grid.push(row);
  if (row.every((char) => char === ".")) grid.push(row);
}

for (let x = grid[0].length - 1; x >= 0; x--) {
  let same = true;
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] != ".") {
      same = false;
      break;
    }
  }

  if (same) {
    console.log("ok");
    for (let y = 0; y < grid.length; y++) {
      grid[y].splice(x, 0, ".");
    }
  }
}

const xLength = grid[0].length;
const yLength = grid.length;
console.log({ xLength, yLength });
console.log({ expectedResult: 0, result: 0 });
