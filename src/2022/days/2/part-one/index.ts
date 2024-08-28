import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" "));
// eslint-disable-next-line prefer-const
let accumulator = 0;

const dict: { [k: string]: string } = {
  X: "A",
  Y: "B",
  Z: "C",
};
const points: { [k: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
};

for (const [opponent, me] of lines) {
  const play = dict[me];
  accumulator += points[play];

  if (opponent == play) {
    accumulator += 3;
  } else {
    if (opponent == "A" && play == "B") {
      accumulator += 6;
    }
    if (opponent == "B" && play == "C") {
      accumulator += 6;
    }
    if (opponent == "C" && play == "A") {
      accumulator += 6;
    }
  }
}
console.log({ expectedResult: 12156, result: accumulator });
