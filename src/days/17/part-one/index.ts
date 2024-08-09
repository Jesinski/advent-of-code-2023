import { readFileSync } from "fs";
import path from "path";
import { MinHeap } from "./minHeap";
const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const matrix = inputFile.split("\n").map((e) => e.split("").map((e) => +e));
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
function getKey(node: number[]) {
  return node.join(",");
}

const m = matrix.length;
const n = matrix[0].length;
// row, col, heatLoss, dirX, dirY, steps
const toVisit = new MinHeap();
toVisit.insert([0, 0, 0, 0, 0, 0]);
const visited = new Map();

while (toVisit.elements > 0) {
  const visiting = toVisit.removeMin();
  if (!visiting) {
    continue;
  }
  const [row, column, heatLoss, dirX, dirY, steps] = visiting;
  const key = getKey([row, column]);
  if (visited.has(key)) {
    const [lastSeenCounter] = visited.get(key);
    if (heatLoss + matrix[row][column] > lastSeenCounter) {
      continue;
    }
  }
  visited.set(key, [heatLoss + matrix[row][column]]);
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newColumn = column + dy;
    const newKey = getKey([newRow, newColumn]);

    if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
      if (visited.has(newKey)) {
        const [counter] = visited.get(newKey);
        if (counter + matrix[row][column] < counter) {
          visited.set(newKey, [counter + matrix[row][column]]);
          toVisit.insert([
            newRow,
            newColumn,
            counter + matrix[row][column],
            dx,
            dy,
            steps + 1,
          ]);
        }
      } else {
        toVisit.insert([
          newRow,
          newColumn,
          heatLoss + matrix[row][column],
          dx,
          dy,
          steps + 1,
        ]);
      }
    }
  }
}

console.log(visited);
// console.log(visited.get([m - 1, n - 1].join(",")));
let accumulator = 0;

console.log({ expectedResult: 0, result: accumulator });
