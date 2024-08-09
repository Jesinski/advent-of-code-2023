import { readFileSync } from "fs";
import path from "path";

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
const dp = new Array(m + 1).fill([]).map(() => new Array(n + 1).fill(-1));
dp[0][0] = 0;

console.log(dp);
const toVisit = [[0, 0, 0]];
const visited = new Map();

while (toVisit.length > 0) {
  const visiting = toVisit.shift();
  if (!visiting) {
    continue;
  }
  const [row, column, counter] = visiting;
  const key = getKey([row, column]);
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newColumn = column + dy;
    const newKey = getKey([newRow, newColumn]);
    if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
      if (visited.has(newKey)) {
        const [counter] = visited.get(newKey);
        if (counter + matrix[row][column] < counter) {
          visited.set(newKey, [counter + matrix[row][column]]);
          toVisit.push([newRow, newColumn, counter + matrix[row][column]]);
        }
      } else {
        visited.set(newKey, [counter + matrix[row][column]]);
        toVisit.push([newRow, newColumn, counter + matrix[row][column]]);
      }
    }
  }
}
console.log(visited.get("2,2"));
let accumulator = 0;

console.log({ expectedResult: 0, result: accumulator });
