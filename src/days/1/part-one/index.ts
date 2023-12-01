import { readFileSync } from "fs";

const file = readFileSync("./input.txt", "utf-8");

let calibrationSum = 0;

for (const line of file.split("\n")) {
  let lDigit = "";
  let rDigit = "";
  let l = 0;
  let r = line.length - 1;

  for (let i = 0; i < line.length; i++) {
    if (lDigit === "") {
      if (!isNaN(+line.charAt(l))) {
        lDigit = line.charAt(l);
      } else {
        l++;
      }
    }
    if (rDigit === "") {
      if (!isNaN(+line.charAt(r))) {
        rDigit = line.charAt(r);
      } else {
        r--;
      }
    }
  }

  const value = +(lDigit + rDigit);
  console.log(value);
  calibrationSum += value;
}

console.log({ calibrationSum });

// Correct Solution = 55834
