import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split("").map(Number));
// eslint-disable-next-line prefer-const
let accumulator = 0;
const m = lines.length;
const n = lines[0].length;
let highest = -1;

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const h = lines[i][j];
    const view = [];
    let dist = 1;

    //check up
    dist = 1;
    while (i - dist >= 0 && lines[i - dist][j] < h) {
      dist++;
    }
    if (i - dist == -1) dist--;
    view.push(dist);

    //check left
    dist = 1;
    while (j - dist >= 0 && lines[i][j - dist] < h) {
      dist++;
    }
    if (j - dist == -1) dist--;
    view.push(dist);

    //check right
    dist = 1;
    while (j + dist < n && lines[i][j + dist] < h) {
      dist++;
    }
    if (j + dist == n) dist--;
    view.push(dist);

    //check down
    dist = 1;
    while (i + dist < m && lines[i + dist][j] < h) {
      dist++;
    }
    if (i + dist == m) dist--;
    view.push(dist);

    highest = Math.max(
      highest,
      view.reduce((acc, val) => acc * val, 1)
    );
  }
}
accumulator = highest;
console.log({ expectedResult: 537600, result: accumulator });
