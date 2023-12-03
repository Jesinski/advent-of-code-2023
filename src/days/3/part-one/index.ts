import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const symbolsRegex = /[^a-zA-Z0-9.\n]+/g;
let accumulator = 0;
for (let y = 0; y < lines.length; y++) {
  const regex = RegExp(/\d+/, "g");
  const numbers = lines[y].matchAll(regex);

  if (!numbers) {
    continue;
  }

  let array1;
  let indexSearching = 0;
  let shouldSum = false;
  while ((array1 = regex.exec(lines[y])) !== null) {
    shouldSum = false;
    for (let i = 0; i < array1[0].length; i++) {
      const x = lines[y].indexOf(array1[0], indexSearching) + i;

      if (lines[y - 1] && lines[y - 1][x - 1])
        if (lines[y - 1][x - 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y - 1] && lines[y - 1][x])
        if (lines[y - 1][x].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y - 1] && lines[y - 1][x + 1])
        if (lines[y - 1][x + 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y] && lines[y][x - 1])
        if (lines[y][x - 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y] && lines[y][x + 1])
        if (lines[y][x + 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x - 1])
        if (lines[y + 1][x - 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x])
        if (lines[y + 1][x].match(symbolsRegex) != null) {
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x + 1])
        if (lines[y + 1][x + 1].match(symbolsRegex) != null) {
          shouldSum = true;
        }
    }

    indexSearching = regex.lastIndex;
    if (shouldSum) {
      accumulator += +array1[0];
    }
  }
}

console.log({ expectedResult: 514969, result: accumulator });
