import { readFileSync } from "fs";

const file = readFileSync("./input.txt", "utf-8");

const DIGITS = new Map<string, string>([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);
let calibrationSum = 0;

for (const line of file.split("\n")) {
  let lDigit: string = "";
  let lIndex = line.length - 1;

  let rDigit: string = "";
  let rIndex = 0;

  let l = 0;
  let r = line.length - 1;

  DIGITS.forEach((value, key) => {
    const index = line.indexOf(key);
    const index2 = line.lastIndexOf(key);

    if (index != -1) {
      if (index < lIndex) {
        lIndex = index;
        lDigit = value;
      }
    }
    if (index2 > rIndex) {
      rIndex = index2;
      rDigit = value;
    }
    // console.log(line, key, line.indexOf(key));
  });

  while (lIndex >= 0) {
    if (!isNaN(+line.charAt(lIndex))) {
      lDigit = line.charAt(lIndex);
    }
    lIndex--;
  }

  while (rIndex <= line.length - 1) {
    if (!isNaN(+line.charAt(rIndex))) {
      rDigit = line.charAt(rIndex);
    }
    rIndex++;
  }

  // console.log({ lDigit, lIndex, rDigit, rIndex });

  const value = +(lDigit + rDigit);
  console.log({ [line]: value });
  calibrationSum += value;
}
// { '45five7fivegpzhcfbbfiveqhnhhzdqtnltgnkrxz': 47 }
console.log({ calibrationSum });

// Correct Solution = 53221
