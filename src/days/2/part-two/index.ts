import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

let accumulator = 0;

// Split by either "," or ";"
const gameRoundsRegex = /,|;/g;
// Match one or more consecutive digits
const amountRegex = /\d+/g;
// Match one or more consecutive capitalized or not letters
const cubeColorRegex = /[a-zA-Z]+/g;

for (const line of lines) {
  const CUBES_MAX_VALUE: { [key: string]: number } = {
    red: 0,
    green: 0,
    blue: 0,
  } as const;

  const gameRounds = line.slice(line.indexOf(":") + 1).split(gameRoundsRegex);

  for (const gameRound of gameRounds) {
    const amount = +gameRound.match(amountRegex)![0];
    const cubeColor = gameRound.match(cubeColorRegex)![0];

    if (amount > CUBES_MAX_VALUE[cubeColor]) {
      CUBES_MAX_VALUE[cubeColor] = amount;
    }
  }

  const power = Object.values(CUBES_MAX_VALUE).reduce(
    (prevValue, currentValue) => prevValue * currentValue,
    1
  );

  accumulator += power;
}

console.log({ expectedResult: 66016, result: accumulator });
