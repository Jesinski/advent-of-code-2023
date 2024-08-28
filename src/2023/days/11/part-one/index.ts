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
  if (row.every((char) => char === ".")) {
    grid.push([...row]);
  }
}

for (let x = grid[0].length - 1; x >= 0; x--) {
  let hasGalaxy = false;
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] != ".") {
      hasGalaxy = true;
      break;
    }
  }
  if (!hasGalaxy) {
    for (let y = 0; y < grid.length; y++) {
      grid[y].splice(x + 1, 0, ".");
    }
  }
}
const yLength = grid[0].length;
const xLength = grid.length;
console.log({ xLength: yLength, yLength: xLength });

for (let x = 0; x < xLength; x++) {
  for (let y = 0; y < yLength; y++) {
    if (grid[x][y] != ".") {
      galaxies.push({
        id: grid[x][y],
        y: x,
        x: y,
      });
    }
  }
}

const distances = new Map<string, number>();
galaxies.forEach((galaxy, index, galaxies) => {
  for (let i = 0; i < galaxies.length; i++) {
    if (index === i) continue;

    const x = Math.abs(galaxy.x - galaxies[i].x);
    const y = Math.abs(galaxy.y - galaxies[i].y);
    if (!distances.has(String([galaxies[i].id, galaxy.id]))) {
      distances.set(String([galaxy.id, galaxies[i].id]), x + y);
    }
  }
});
let result = 0;

const iter = distances.values();
let curr = iter.next().value;
while (curr) {
  result += curr;
  curr = iter.next().value;
}
console.log({ expectedResult: 10289334, result: result });

// function printGrid(grid: string[][]) {
//   let line = 0;
//   for (const row of grid) {
//     const ro = row.join("");
//     console.log(line++, "\t", ro);
//   }
//   console.log();
// }
