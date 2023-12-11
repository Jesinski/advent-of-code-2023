import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const grid: string[][] = [];
const lines = inputFile.split("\n");
let id = 1;
type Galaxy = {
  id: string;
  x: number;
  y: number;
  distance: Map<string, number>;
};
const galaxies: Galaxy[] = [];

for (const line of lines) {
  const row = [...line.split("")];
  row.forEach((char, index) => {
    if (char != ".") {
      row[index] = String(id);
      id++;
    }
  });
  grid.push(row);
  if (row.every((char) => char === ".")) grid.push([...row]);
}
for (let x = grid[0].length - 1; x >= 0; x--) {
  let hasGalaxy = false;
  for (let y = 0; y < grid.length - 1; y++) {
    if (grid[y][x] != ".") {
      hasGalaxy = true;
      break;
    }
  }
  if (!hasGalaxy) {
    for (let y = 0; y < grid.length; y++) {
      grid[y].splice(x, 0, ".");
    }
    x--;
  }
}
const yLength = grid[0].length;
const xLength = grid.length;
console.log({ xLength: yLength, yLength: xLength });
printGrid(grid);
console.log({ expectedResult: 0, result: 0 });

// find all galaxies (not wokring)
for (let x = 0; x < xLength; x++) {
  for (let y = 0; y < yLength; y++) {
    if (grid[x][y] != ".") {
      galaxies.push({
        id: grid[x][y],
        y: x,
        x: y,
        distance: new Map<string, number>(),
      });
    }
  }
}
console.log({ galaxies });

for (const galaxy of galaxies) {
}

function printGrid(grid: string[][]) {
  let line = 0;
  for (const row of grid) {
    const ro = row.join("");
    console.log(line++, "\t", ro);
  }
  console.log();
}
