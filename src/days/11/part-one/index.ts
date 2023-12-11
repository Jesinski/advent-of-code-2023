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
const xLength = grid[0].length;
const yLength = grid.length;
console.log({ xLength, yLength });
console.log({ galaxies });
printGrid(grid);
console.log({ expectedResult: 0, result: 0 });

function printGrid(grid: string[][]) {
  let line = 0;
  for (const row of grid) {
    const ro = row.join("");
    console.log(line++, "\t", ro);
  }
  console.log();
}
