import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");
type NumberType = {
  number: string;
  startingIndex: number;
  endingIndex: number;
};

const numbers = getNumbers();

console.log(numbers);

const asterisk = /\*|\n/g;
let accumulator = 0;

let matches;
let line = 0;
let lastIndex = 0;

// Assuming that every line has the same length
const lineLength = inputFile.indexOf("\n");
while ((matches = asterisk.exec(inputFile)) != null) {
  const adjacentNumbers = new Set<NumberType>();
  // const adjacentNumbers: NumberType[] = [];
  if (matches[0] == "\n") {
    line++;
    continue;
  }
  const currentIndex = inputFile.indexOf(matches[0], lastIndex);
  console.log("line", line, currentIndex);
  lastIndex = asterisk.lastIndex;

  const topLeft = currentIndex - lineLength - 2;
  console.log("top-left", inputFile.charAt(topLeft));
  let brea = checkSomeshit(topLeft, adjacentNumbers);
  if (brea) {
    continue;
  }

  const top = currentIndex - lineLength - 1;
  console.log("top", inputFile.charAt(top));
  brea = checkSomeshit(top, adjacentNumbers);
  if (brea) {
    continue;
  }

  const topRight = currentIndex - lineLength;
  console.log("top-right", inputFile.charAt(topRight));
  brea = checkSomeshit(topRight, adjacentNumbers);
  if (brea) {
    continue;
  }

  const left = currentIndex - 1;
  console.log("left", inputFile.charAt(left));
  brea = checkSomeshit(left, adjacentNumbers);
  if (brea) {
    continue;
  }

  const right = currentIndex + 1;
  console.log("right", inputFile.charAt(right));
  brea = checkSomeshit(right, adjacentNumbers);
  if (brea) {
    continue;
  }

  const bottomLeft = currentIndex + lineLength;
  console.log("bottom-left", inputFile.charAt(bottomLeft));
  brea = checkSomeshit(bottomLeft, adjacentNumbers);
  if (brea) {
    continue;
  }

  const bottom = currentIndex + lineLength + 1;
  console.log("bottom", inputFile.charAt(bottom));
  brea = checkSomeshit(bottom, adjacentNumbers);
  if (brea) {
    continue;
  }

  const bottomRight = currentIndex + lineLength + 2;
  console.log("bottom-right", inputFile.charAt(bottomRight));
  brea = checkSomeshit(bottomRight, adjacentNumbers);
  if (brea) {
    continue;
  }
}
console.log({ expectedResult: 78915902, result: accumulator });

function checkSomeshit(top: number, adjacentNumbers: Set<NumberType>) {
  if (!isNaN(+inputFile.charAt(top))) {
    const num = numbers.find(
      (number) => number.startingIndex <= top && top <= number.endingIndex
    );
    if (num) {
      adjacentNumbers.add(num);
      if (adjacentNumbers.size > 1) {
        let product = 1;

        console.log("product", adjacentNumbers.values());
        adjacentNumbers.forEach((value) => {
          product = product * +value.number;
        });

        accumulator += product;
        return true;
      }
    }
  }
  return false;
}

function getNumbers() {
  const numbers = [];
  const digits = /\d+/g;
  let arr;
  let sIndex = 0;
  while ((arr = digits.exec(inputFile)) != null) {
    numbers.push({
      number: arr[0],
      startingIndex: inputFile.indexOf(arr[0], sIndex),
      endingIndex: inputFile.indexOf(arr[0], sIndex) + arr[0].length - 1,
    });
    sIndex = digits.lastIndex;
  }

  return numbers;
}
