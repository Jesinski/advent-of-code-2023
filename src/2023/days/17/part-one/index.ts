import { readFileSync } from "fs";
import path from "path";
import { MinHeap } from "../minHeap";
const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const matrix = inputFile.split("\n").map((e) => e.split("").map((e) => +e));
let accumulator = 0;

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

const toVisit = new MinHeap();
toVisit.insert([0, 0, 0, 0, 0, 0]);
const visited = new Set();

while (toVisit.elements > 0) {
  const visiting = toVisit.removeMin();
  if (!visiting) {
    continue;
  }
  const [heatLoss, row, column, dirRow, dirCol, steps] = visiting;

  const key = getKey([row, column, dirRow, dirCol, steps]);
  if (visited.has(key)) {
    continue;
  }
  visited.add(key);

  if (row == m - 1 && column == n - 1) {
    accumulator = heatLoss;
    break;
  }

  if (steps < 3 && (dirRow != 0 || dirCol != 0)) {
    const newRow = row + dirRow;
    const newCol = column + dirCol;
    if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
      toVisit.insert([
        heatLoss + matrix[newRow][newCol],
        newRow,
        newCol,
        dirRow,
        dirCol,
        steps + 1,
      ]);
    }
  }

  for (const [ndr, ndc] of directions) {
    if (
      (ndr != dirRow || ndc != dirCol) &&
      (ndr != -dirRow || ndc != -dirCol)
    ) {
      const newRow = row + ndr;
      const newCol = column + ndc;
      if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
        toVisit.insert([
          heatLoss + matrix[newRow][newCol],
          newRow,
          newCol,
          ndr,
          ndc,
          1,
        ]);
      }
    }
  }
}

console.log({ expectedResult: 742, result: accumulator });
