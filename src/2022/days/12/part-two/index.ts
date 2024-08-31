import { readFileSync } from "fs";
import path from "path";
import { MinHeap } from "../minHeap";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(""));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const sources: [number, number][] = [];
const target: [number, number] = [-1, -1];
const rows = lines.length;
const cols = lines[0].length;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (lines[r][c] == "S" || lines[r][c] == "a") {
      sources.push([r, c]);
      lines[r][c] = "a";
    }
    if (lines[r][c] == "E") {
      target[0] = r;
      target[1] = c;
      lines[r][c] = "z";
    }
  }
}
const queue = new MinHeap();
for (const source of sources) {
  queue.insert([...source, 0]);
}
const visited = new Set();
const directions = [
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, 0],
];
while (queue.elements) {
  const node = queue.removeMin();
  if (!node) {
    console.log("Unreachable");
    continue;
  }
  const [r, c, s] = node;
  if (r == target[0] && c == target[1]) {
    accumulator = s;
    break;
  }
  if (visited.has(`${r},${c},${s}`)) {
    continue;
  }
  visited.add(`${r},${c},${s}`);
  for (const [dx, dy] of directions) {
    const nr = r + dx;
    const nc = c + dy;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      const oldChar = lines[r][c].charCodeAt(0);
      const char = lines[nr][nc].charCodeAt(0);
      if (char <= oldChar + 1) {
        queue.insert([nr, nc, s + 1]);
      }
    }
  }
}
console.log({ expectedResult: 439, result: accumulator });
