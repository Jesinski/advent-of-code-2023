import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

let hX = 0;
let hY = 0;

let tX = 0;
let tY = 0;
const visited = new Set(["0,0"]);
for (const line of lines) {
  const [dir, steps] = line;

  switch (dir) {
    case "R":
      for (let i = 0; i < +steps; i++) {
        hX++;
        checkT();
      }
      break;
    case "U":
      for (let i = 0; i < +steps; i++) {
        hY++;
        checkT();
      }
      break;
    case "L":
      for (let i = 0; i < +steps; i++) {
        hX--;
        checkT();
      }
      break;
    case "D":
      for (let i = 0; i < +steps; i++) {
        hY--;
        checkT();
      }
      break;
  }
}

function checkT() {
  const xDiff = Math.abs(tX - hX);
  const yDiff = Math.abs(tY - hY);

  if (tX == hX && yDiff > 1) {
    if (tY < hY) {
      tY++;
    } else {
      tY--;
    }
  } else if (tY == hY && xDiff > 1) {
    if (tX < hX) {
      tX++;
    } else {
      tX--;
    }
  } else if (xDiff + yDiff > 2) {
    if (hX < tX && hY < tY) {
      tX--;
      tY--;
    } else if (hX < tX && hY > tY) {
      tX--;
      tY++;
    } else if (hX > tX && hY > tY) {
      tX++;
      tY++;
    } else if (hX > tX && hY < tY) {
      tX++;
      tY--;
    }
  }
  console.log(hX, hY, "\t|\t", tX, tY);

  visited.add(`${tX},${tY}`);
}
accumulator = visited.size;
console.log({ expectedResult: 6190, result: accumulator });
