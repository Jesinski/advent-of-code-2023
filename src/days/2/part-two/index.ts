import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const LIMIT: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

let accumultor = 0;

for (const line of lines) {
  const gameNumber = +line.slice(0, line.indexOf(":")).match(/\d+/g)![0];
  const rounds = line.slice(line.indexOf(":") + 1).split(/,|;/g);

  console.log({ gameNumber, rounds });

  let isValid = true;
  for (const round of rounds) {
    const amount = +round.match(/\d+/g)![0];
    const cubeColor = round.match(/[a-zA-Z]+/g)![0];
    console.log({ amount, cubeColor, limit: LIMIT[cubeColor] });

    if (amount > LIMIT[cubeColor]) {
      isValid = false;
    }
  }
  if (isValid) accumultor += gameNumber;
}

console.log({ expectedResult: 2541, result: accumultor });
