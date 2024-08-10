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
  const [hl, r, c, dr, dc, steps] = visiting;

  const key = getKey([r, c, dr, dc, steps]);
  if (visited.has(key)) {
    continue;
  }
  visited.add(key);

  if (r == m - 1 && c == n - 1 && steps >= 4) {
    accumulator = hl;
    break;
  }

  if (steps < 10 && (dr != 0 || dc != 0)) {
    const newRow = r + dr;
    const newCol = c + dc;
    if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
      toVisit.insert([
        hl + matrix[newRow][newCol],
        newRow,
        newCol,
        dr,
        dc,
        steps + 1,
      ]);
    }
  }

  if (steps >= 4 || (dr == 0 && dc == 0)) {
    for (const [ndr, ndc] of directions) {
      if ((ndr != dr || ndc != dc) && (ndr != -dr || ndc != -dc)) {
        const newRow = r + ndr;
        const newCol = c + ndc;
        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
          toVisit.insert([
            hl + matrix[newRow][newCol],
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
}

console.log({ expectedResult: 0, result: accumulator });
