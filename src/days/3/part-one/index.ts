import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const symbolsRegex = /[^a-zA-Z0-9.\n]+/g;
let accumulator = 0;
for (let y = 0; y < lines.length; y++) {
  const regex = RegExp(/\d+/, "g");
  const numbers = lines[y].matchAll(regex);
  // [ '467', '114' ]

  if (!numbers) {
    continue;
  }

  let array1;
  let indexSearching = 0;
  let shouldSum = false;
  while ((array1 = regex.exec(lines[y])) !== null) {
    console.log("processing number...", array1[0]);
    shouldSum = false;
    for (let i = 0; i < array1[0].length; i++) {
      // for (const digit of array1[0]) {
      const x = lines[y].indexOf(array1[0], indexSearching) + i;

      // indexSearching = x;
      if (lines[y - 1] && lines[y - 1][x - 1])
        if (lines[y - 1][x - 1].match(symbolsRegex) != null) {
          console.log(y, "ok1");
          shouldSum = true;
        }

      if (lines[y - 1] && lines[y - 1][x])
        if (lines[y - 1][x].match(symbolsRegex) != null) {
          console.log(lines[y - 1][x].match(symbolsRegex));
          console.log(y, "ok2");
          shouldSum = true;
        }

      if (lines[y - 1] && lines[y - 1][x + 1])
        if (lines[y - 1][x + 1].match(symbolsRegex) != null) {
          console.log(y, "ok3");
          shouldSum = true;
        }

      if (lines[y] && lines[y][x - 1])
        if (lines[y][x - 1].match(symbolsRegex) != null) {
          console.log(y, "ok4");
          shouldSum = true;
        }

      if (lines[y] && lines[y][x + 1])
        if (lines[y][x + 1].match(symbolsRegex) != null) {
          console.log(y, "ok5");
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x - 1])
        if (lines[y + 1][x - 1].match(symbolsRegex) != null) {
          console.log(y, "ok6");
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x])
        if (lines[y + 1][x].match(symbolsRegex) != null) {
          console.log(y, "ok7");
          shouldSum = true;
        }

      if (lines[y + 1] && lines[y + 1][x + 1])
        if (lines[y + 1][x + 1].match(symbolsRegex) != null) {
          console.log(y, "ok8");
          shouldSum = true;
        }
    }

    console.log("finished processing number...", array1[0]);
    console.log("found adjacent symbol?", shouldSum);
    indexSearching = regex.lastIndex;
    if (shouldSum) {
      accumulator += +array1[0];
    }
  }
}

console.log({ expectedResult: 4361, result: accumulator });
