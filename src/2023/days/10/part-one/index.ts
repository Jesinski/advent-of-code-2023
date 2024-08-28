import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

type MazeSymbols = "-" | "7" | "|" | "J" | "L" | "S" | "F";

const lineLength = inputFile.indexOf("\n");
const STEP = {
  UP: -lineLength - 1,
  DOWN: +lineLength + 1,
  LEFT: -1,
  RIGHT: +1,
};

const startingIndex = inputFile.indexOf("S");
let visited: number[] = [startingIndex];

const directions: { [key: string]: { startingPos: number; steps: number } } = {
  left: { startingPos: startingIndex + STEP.LEFT, steps: 0 },
  right: { startingPos: startingIndex + STEP.RIGHT, steps: 0 },
  up: { startingPos: startingIndex + STEP.UP, steps: 0 },
  down: { startingPos: startingIndex + STEP.DOWN, steps: 0 },
};

let steps = 0;
let ans = 0;
for (const key in directions) {
  steps = 0;
  visited = [startingIndex];

  const direction = directions[key];

  runMaze(direction.startingPos);
  direction.steps = Math.ceil(steps / 2);

  if (ans < direction.steps) {
    ans = direction.steps;
  }
}

function runMaze(pos: number) {
  if (inputFile.charAt(pos) === "." || inputFile.charAt(pos) === "S") return;

  pos = getNextPos(pos);
  while (pos != -1) {
    pos = getNextPos(pos);
    visited.push(pos);
    steps++;
  }
}

console.log({ expectedResult: 6738, result: ans });

function getNextPos(pos: number) {
  const char = inputFile.charAt(pos) as MazeSymbols;
  switch (char) {
    case "-":
      if (!visited.includes(pos + STEP.LEFT)) return pos + STEP.LEFT;
      if (!visited.includes(pos + STEP.RIGHT)) return pos + STEP.RIGHT;
      return -1;
    case "7":
      if (!visited.includes(pos + STEP.DOWN)) return pos + STEP.DOWN;
      if (!visited.includes(pos + STEP.LEFT)) return pos + STEP.LEFT;
      return -1;
    case "|":
      if (!visited.includes(pos + STEP.DOWN)) return pos + STEP.DOWN;
      if (!visited.includes(pos + STEP.UP)) return pos + STEP.UP;
      return -1;
    case "J":
      if (!visited.includes(pos + STEP.UP)) return pos + STEP.UP;
      if (!visited.includes(pos + STEP.LEFT)) return pos + STEP.LEFT;
      return -1;
    case "L":
      if (!visited.includes(pos + STEP.UP)) return pos + STEP.UP;
      if (!visited.includes(pos + STEP.RIGHT)) return pos + STEP.RIGHT;
      return -1;
    case "F":
      if (!visited.includes(pos + STEP.RIGHT)) return pos + STEP.RIGHT;
      if (!visited.includes(pos + STEP.DOWN)) return pos + STEP.DOWN;
      return -1;
    case "S":
      return -1;
  }
}
