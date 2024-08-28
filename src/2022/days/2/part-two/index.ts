import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const win: { [k: string]: string } = {
  A: "C",
  B: "A",
  C: "B",
};

const lose: { [k: string]: string } = {
  A: "B",
  B: "C",
  C: "A",
};

const points: { [k: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
};

for (const [opponent, me] of lines) {
  switch (me) {
    case "Y":
      accumulator += points[opponent] + 3;
      break;
    case "Z": {
      const play = lose[opponent];
      accumulator += points[play] + 6;
      break;
    }
    case "X": {
      const play = win[opponent];
      accumulator += points[play];
      break;
    }
    default:
      console.log("Unreachable", me);
  }
}
console.log({ expectedResult: 10835, result: accumulator });
