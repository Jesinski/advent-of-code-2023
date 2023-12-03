import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

type NumberType = {
  number: number;
  startingIndex: number;
  endingIndex: number;
};

const numbers = getNumbers();

const asterisk = /\*|\n/g;
let accumulator = 0;

let matches;
let lastIndex = 0;

// Assuming that every line has the same length
const lineLength = inputFile.indexOf("\n");

while ((matches = asterisk.exec(inputFile)) != null) {
  const adjacentNumbers = new Set<NumberType>();
  if (matches[0] == "\n") {
    continue;
  }
  const currentIndex = inputFile.indexOf(matches[0], lastIndex);

  lastIndex = asterisk.lastIndex;

  const positions: { [key: string]: number } = {
    topLeft: currentIndex - lineLength - 2,
    top: currentIndex - lineLength - 1,
    topRight: currentIndex - lineLength,
    left: currentIndex - 1,
    right: currentIndex + 1,
    bottomLeft: currentIndex + lineLength,
    bottom: currentIndex + lineLength + 1,
    bottomRight: currentIndex + lineLength + 2,
  };

  for (const position in positions) {
    const charIndex = positions[position];
    if (!isNaN(+inputFile.charAt(charIndex))) {
      const num = numbers.find(
        (number) =>
          number.startingIndex <= charIndex && charIndex <= number.endingIndex
      );

      if (num) {
        adjacentNumbers.add(num);
        if (adjacentNumbers.size > 1) {
          let product = 1;

          adjacentNumbers.forEach((value) => {
            product = product * value.number;
          });

          accumulator += product;
          break;
        }
      }
    }
  }
}
console.log({ expectedResult: 78915902, result: accumulator });

function getNumbers() {
  const numbers = [];
  const digits = /\d+/g;
  let arr;
  let lastIndex = 0;
  while ((arr = digits.exec(inputFile)) != null) {
    const startingIndex = inputFile.indexOf(arr[0], lastIndex);
    numbers.push({
      number: +arr[0],
      startingIndex: startingIndex,
      endingIndex: startingIndex + arr[0].length - 1,
    });
    lastIndex = digits.lastIndex;
  }

  return numbers;
}
