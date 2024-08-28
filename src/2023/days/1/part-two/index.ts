import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const WORDS_TO_DIGITS = new Map<string, string>([
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

for (const line of lines) {
  let leftmostDigit = "";
  let leftIndex = line.length - 1;

  let rightmostDigit = "";
  let rightIndex = 0;

  WORDS_TO_DIGITS.forEach((value, key) => {
    const firstIndex = line.indexOf(key);
    const lastIndex = line.lastIndexOf(key);

    if (firstIndex != -1) {
      if (firstIndex < leftIndex) {
        leftIndex = firstIndex;
        leftmostDigit = value;
      }
    }

    if (lastIndex > rightIndex) {
      rightIndex = lastIndex;
      rightmostDigit = value;
    }
  });

  while (leftIndex >= 0) {
    const char = line.charAt(leftIndex);
    if (!isNaN(+char)) {
      leftmostDigit = char;
    }
    leftIndex--;
  }

  while (rightIndex <= line.length - 1) {
    const char = line.charAt(rightIndex);
    if (!isNaN(+char)) {
      const char = line.charAt(rightIndex);
      rightmostDigit = char;
    }
    rightIndex++;
  }

  // Concatenate the strings, then cast it to number
  calibrationSum += +(leftmostDigit + rightmostDigit);
}

console.log({ expectedResult: 53221, result: calibrationSum });
