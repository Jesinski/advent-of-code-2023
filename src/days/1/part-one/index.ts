import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

let calibrationSum = 0;

for (const line of lines) {
  // Keep the digit as string to concatenate later
  let leftmostDigit = "";
  let rightmostDigit = "";
  let leftIndex = 0;
  let rightIndex = line.length - 1;

  while (leftmostDigit === "" || rightmostDigit === "") {
    if (leftmostDigit === "") {
      const char = line.charAt(leftIndex);

      if (!isNaN(+char)) {
        leftmostDigit = char;
      } else {
        leftIndex++;
      }
    }

    if (rightmostDigit === "") {
      const char = line.charAt(rightIndex);

      if (!isNaN(+char)) {
        rightmostDigit = char;
      } else {
        rightIndex--;
      }
    }
  }

  // Concatenate the strings, then cast it to number
  calibrationSum += +(leftmostDigit + rightmostDigit);
}

console.log({ expectedResult: 55834, result: calibrationSum });
