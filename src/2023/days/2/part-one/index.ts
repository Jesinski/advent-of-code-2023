import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

// Split by either "," or ";"
const gameRoundsRegex = /,|;/g;
// Match one or more consecutive digits
const numberRegex = /\d+/g;
// Match one or more consecutive capitalized or not letters
const cubeColorRegex = /[a-zA-Z]+/g;

const LIMIT: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

let accumulator = 0;

for (const line of lines) {
  const gameNumber = +line.slice(0, line.indexOf(":")).match(numberRegex)![0];
  const rounds = line.slice(line.indexOf(":") + 1).split(gameRoundsRegex);

  let isPossible = true;
  for (const round of rounds) {
    const amount = +round.match(numberRegex)![0];
    const cubeColor = round.match(cubeColorRegex)![0];

    if (amount > LIMIT[cubeColor]) {
      isPossible = false;
      break;
    }
  }

  if (isPossible) {
    accumulator += gameNumber;
  }
}

console.log({ expectedResult: 2541, result: accumulator });
