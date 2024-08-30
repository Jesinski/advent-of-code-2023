import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const positions = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const visited = new Set(["0,0"]);
for (const line of lines) {
  const [dir, steps] = line;

  switch (dir) {
    case "R":
      for (let i = 0; i < +steps; i++) {
        positions[0][0]++;
        updateTail();
      }
      break;
    case "U":
      for (let i = 0; i < +steps; i++) {
        positions[0][1]++;
        updateTail();
      }
      break;
    case "L":
      for (let i = 0; i < +steps; i++) {
        positions[0][0]--;
        updateTail();
      }
      break;
    case "D":
      for (let i = 0; i < +steps; i++) {
        positions[0][1]--;
        updateTail();
      }
      break;
  }
}
function updateTail() {
  for (let i = 0; i < positions.length - 1; i++) {
    const [hX, hY] = positions[i];
    checkT(hX, hY, i + 1);
  }
}

function checkT(hX: number, hY: number, checkIndex: number) {
  const xDiff = Math.abs(positions[checkIndex][0] - hX);
  const yDiff = Math.abs(positions[checkIndex][1] - hY);

  if (positions[checkIndex][0] == hX && yDiff > 1) {
    if (positions[checkIndex][1] < hY) {
      positions[checkIndex][1]++;
    } else {
      positions[checkIndex][1]--;
    }
  } else if (positions[checkIndex][1] == hY && xDiff > 1) {
    if (positions[checkIndex][0] < hX) {
      positions[checkIndex][0]++;
    } else {
      positions[checkIndex][0]--;
    }
  } else if (xDiff + yDiff > 2) {
    if (hX < positions[checkIndex][0] && hY < positions[checkIndex][1]) {
      positions[checkIndex][0]--;
      positions[checkIndex][1]--;
    } else if (hX < positions[checkIndex][0] && hY > positions[checkIndex][1]) {
      positions[checkIndex][0]--;
      positions[checkIndex][1]++;
    } else if (hX > positions[checkIndex][0] && hY > positions[checkIndex][1]) {
      positions[checkIndex][0]++;
      positions[checkIndex][1]++;
    } else if (hX > positions[checkIndex][0] && hY < positions[checkIndex][1]) {
      positions[checkIndex][0]++;
      positions[checkIndex][1]--;
    }
  }
  if (checkIndex == positions.length - 1) {
    visited.add(`${positions[checkIndex][0]},${positions[checkIndex][1]}`);
  }
}
accumulator = visited.size;
console.log({ expectedResult: 2516, result: accumulator });
