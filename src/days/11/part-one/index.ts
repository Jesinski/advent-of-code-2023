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

printGrid(grid);

grid.forEach((row) => console.log(row.length));
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
// printGrid(grid);
console.log({ expectedResult: 0, result: 0 });
// let targetNodes: string[] = [];
for (let x = 0; x < xLength; x++) {
  for (let y = 0; y < yLength; y++) {
    if (grid[x][y] != ".") {
      // targetNodes.push(grid[x][y]);
      galaxies.push({
        id: grid[x][y],
        y: x,
        x: y,
      });
    }
  }
}
// galaxies.push({ id: "1", y: 0, x: 4, distance: new Map() });
// console.log({ galaxies });
const distances = new Map<string, number>();
galaxies.forEach((galaxy, index, galaxies) => {
  for (let i = 0; i < galaxies.length; i++) {
    if (index === i) continue;

    const x = Math.abs(galaxy.x - galaxies[i].x);
    const y = Math.abs(galaxy.y - galaxies[i].y);
    if (!distances.has(String([galaxies[i].id, galaxy.id]))) {
      distances.set(String([galaxy.id, galaxies[i].id]), x + y);
      // console.log("distance between:", galaxy.id, galaxies[i].id, x + y);
    }
  }
});
let result = 0;
console.log(distances.size);
const iter = distances.values();
let curr = iter.next().value;
while (curr) {
  result += curr;
  curr = iter.next().value;
}
console.log({ expectedResult: 374, result: result });
printGrid(grid);

// 10297128 too high

// const DIRECTIONS: { [key: string]: [number, number] } = {
//   UP: [-1, 0],
//   DOWN: [1, 0],
//   LEFT: [0, -1],
//   RIGHT: [0, 1],
// } as const;
// let unvisitedNodes: string[] = [];
// let visited: string[] = [];
// let steps = 0;
// for (const galaxy of galaxies) {
//   const startingPos = [galaxy.y, galaxy.x];
//   visited = [];
//   steps = 0;
//   unvisitedNodes = [];

//   unvisitedNodes.push(...getUnvisited(startingPos));
//   // console.log(unvisitedNodes);

//   while (unvisitedNodes.length > 0) {
//     const next = (unvisitedNodes.shift() as string).split(",").map((e) => +e);
//     steps++;
//     // grid[next[0]][next[1]] = "V";
//     // printGrid(grid);
//     if (targetNodes.includes(grid[next[0]][next[1]])) {
//       console.log(
//         "galaxy",
//         galaxy.id,
//         "found",
//         grid[next[0]][next[1]],
//         "in",
//         steps
//       );
//     }

//     visited.push(String(next));
//     unvisitedNodes.push(...getUnvisited(next));
//   }

//   console.log("galaxy", galaxy.id, steps);
// }

// // function visit(pos: number[]) {
// //   while (pos.length > 0) {
// //     const next = pos.pop();
// //     steps++;
// //     visited.push(String(next[0] + String(next[1])));
// //     pos.push(...getUnvisited(next));
// //   }
// //   console.log();
// // }

// function getUnvisited(pos: number[]): string[] {
//   const nodes: string[] = [];
//   const up = DIRECTIONS.UP;
//   if (canVisit(pos, up)) nodes.push(String([pos[0] + up[0], pos[1] + up[1]]));

//   const down = DIRECTIONS.DOWN;
//   if (canVisit(pos, down))
//     nodes.push(String([pos[0] + down[0], pos[1] + down[1]]));

//   const left = DIRECTIONS.LEFT;
//   if (canVisit(pos, left))
//     nodes.push(String([pos[0] + left[0], pos[1] + left[1]]));

//   const right = DIRECTIONS.RIGHT;
//   if (canVisit(pos, right))
//     nodes.push(String([pos[0] + right[0], pos[1] + right[1]]));

//   return nodes;
// }

// // function runGrid(pos: number[] | undefined) {
// //   while (pos != undefined) {
// //     visited.push(String(pos[0] + String(pos[1])));
// //     grid[pos[0]][pos[1]] = "V";
// //     printGrid(grid);
// //     steps++;
// //     pos = getNextPos(pos);
// //   }
// //   console.log();
// // }

// // function getNextPos(pos: number[]) {
// //   const up = DIRECTIONS.UP;
// //   if (canVisit(pos, up)) return [pos[0] + up[0], pos[1] + up[1]];

// //   const down = DIRECTIONS.DOWN;
// //   if (canVisit(pos, down)) return [pos[0] + down[0], pos[1] + down[1]];

// //   const left = DIRECTIONS.LEFT;
// //   if (canVisit(pos, left)) return [pos[0] + left[0], pos[1] + left[1]];

// //   const right = DIRECTIONS.RIGHT;
// //   if (canVisit(pos, right)) return [pos[0] + right[0], pos[1] + right[1]];

// //   return undefined;
// // }

// function canVisit(pos: number[], t: [number, number]) {
//   const nextY = pos[0] + t[0];
//   const nextX = pos[1] + t[1];
//   return (
//     grid[nextY] !== undefined &&
//     grid[nextY][nextX] !== undefined &&
//     !unvisitedNodes.includes(String([nextY, nextX])) &&
//     !visited.includes(String([nextY, nextX]))
//   );
// }

function printGrid(grid: string[][]) {
  let line = 0;
  for (const row of grid) {
    const ro = row.join("");
    console.log(line++, "\t", ro);
  }
  console.log();
}
