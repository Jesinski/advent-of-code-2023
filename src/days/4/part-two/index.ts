import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const regex = /\d+|\||\n|:/g;
let matches;

let accumulator = 0;

let state: "card" | "winning" | "games" = "card";
const winningNumbers: Set<number> = new Set();
let additionalScratchCards = 0;
let points = 0;
let cardIndex = -1;
const cardCopies: number[] = new Array(210).fill(0);
let cardsProcessed = 0;

while ((matches = regex.exec(inputFile)) != null) {
  if (matches[0] == "\n") {
    state = "card";
    while (points > 0) {
      cardCopies[cardIndex + points] += additionalScratchCards + 1;
      points--;
    }
    winningNumbers.clear();

    continue;
  }

  if (matches[0] == ":") {
    cardsProcessed++;
    state = "winning";
    continue;
  }

  if (matches[0] == "|") {
    state = "games";
    continue;
  }

  switch (state) {
    case "card": {
      cardIndex++;
      additionalScratchCards = cardCopies[cardIndex];
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
for (let i = 0; i < cardCopies.length; i++) {
  if (!cardCopies[i]) {
    cardCopies[i] = 0;
  }
}
accumulator =
  cardCopies.reduce((prev, current) => prev + current, 0) + cardsProcessed;

console.log({ expectedResult: 7258152, result: accumulator });
