import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((line) => line.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;
const inputs: [string, number][] = [];

for (const line of lines) {
  const hex = line[2].slice(1, line[2].length - 1);

  const units = parseInt(hex.slice(1, hex.length - 1), 16);
  const direction = +hex.slice(hex.length - 1);
  inputs.push(["RDLU"[direction], units]);
}

const points = [];
let r = 0;
let c = 0;
for (const input of inputs) {
  const [dir, units] = input;
  accumulator += units;
  switch (dir) {
    case "R":
      c += units;
      break;
    case "L":
      c -= units;
      break;
    case "U":
      r -= units;
      break;
    case "D":
      r += units;
      break;
  }
  points.unshift([r, c]);
}

let sumX = 0;
let sumY = 0;
for (let i = 0; i < points.length; i++) {
  const [currX, currY] = points[i];
  const [nextX, nextY] = points[(i + 1) % points.length];
  sumX += currX * nextY;
  sumY += currY * nextX;
}
const sum = Math.abs(sumX - sumY);
const area = sum / 2;
accumulator = area + accumulator / 2 - 5;

// 60612092439765 ans
console.log({ expectedResult: 60612092439765, result: accumulator });
