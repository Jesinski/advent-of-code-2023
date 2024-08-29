import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split("").map(Number));
// eslint-disable-next-line prefer-const
let accumulator = 0;
const m = lines.length;
const n = lines[0].length;
accumulator += m * 2;
accumulator += n * 2;
accumulator -= 4;
for (let i = 1; i < m - 1; i++) {
  for (let j = 1; j < n - 1; j++) {
    const h = lines[i][j];
    let dist = 1;
    //check right
    while (j + dist < n && lines[i][j + dist] < h) {
      dist++;
    }
    if (j + dist == n) {
      accumulator++;
      continue;
    }
    dist = 1;
    //check left
    while (j - dist >= 0 && lines[i][j - dist] < h) {
      dist++;
    }
    if (j - dist == -1) {
      accumulator++;
      continue;
    }
    dist = 1;
    //check down
    while (i + dist < m && lines[i + dist][j] < h) {
      dist++;
    }
    if (i + dist == m) {
      accumulator++;
      continue;
    }
    dist = 1;
    //check up
    while (i - dist >= 0 && lines[i - dist][j] < h) {
      dist++;
    }
    if (i - dist == -1) {
      accumulator++;
      continue;
    }
  }
}

console.log({ expectedResult: 1662, result: accumulator });
