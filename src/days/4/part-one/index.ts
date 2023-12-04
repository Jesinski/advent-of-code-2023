import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const regex = /\d+|\||\n|:/g;
let matches;

let accumulator = 0;

let state: "card" | "winning" | "games" = "card";
const winningNumbers: Set<number> = new Set();
let points = 0;
while ((matches = regex.exec(inputFile)) != null) {
  if (matches[0] == "\n") {
    state = "card";
    if (points > 0) {
      const pointsWon = Math.pow(2, points - 1);
      accumulator += pointsWon;
      points = 0;
    }
    winningNumbers.clear();
    continue;
  }

  if (matches[0] == ":") {
    state = "winning";
    continue;
  }

  if (matches[0] == "|") {
    state = "games";
    continue;
  }

  switch (state) {
    case "card": {
      continue;
    }
    case "winning": {
      winningNumbers.add(+matches[0]);
      continue;
    }
    case "games": {
      if (winningNumbers.has(+matches[0])) {
        points++;
      }
      continue;
    }
  }
}

if (points > 0) {
  const pointsWon = Math.pow(2, points - 1);
  accumulator += pointsWon;
  points = 0;
}

console.log({ expectedResult: 24848, result: accumulator });
