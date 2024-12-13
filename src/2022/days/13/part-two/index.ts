import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n\n");
const lists = lines.map((line) =>
  line.split("\n").map((entry) => JSON.parse(entry))
);
// eslint-disable-next-line prefer-const
let accumulator = 0;
let index = 0;
for (const list of lists) {
  index++;
  const [left, right] = list;
  console.log(left);
  console.log(right);
  const valid = compare(left, right);
  if (valid == 1) {
    accumulator += index;
  }
  console.log(index, valid);
  console.log(" ");
}

function compare(left: any[], right: any[]) {
  if (Array.isArray(left) && !Array.isArray(right)) {
    right = [right];
  }
  if (!Array.isArray(left) && Array.isArray(right)) {
    left = [left];
  }
  if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) {
      return 1;
    }
    if (left == right) {
      return 0;
    }
    return -1;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0;

    while (i < left.length && i < right.length) {
      const result = compare(left[i], right[i]);
      if (result == 1) {
        return 1;
      }
      if (result == -1) {
        return -1;
      }
      i++;
    }
    if (i == left.length) {
      if (left.length == right.length) {
        return 0;
      }
      return 1;
    }
    return -1;
  }
}
console.log({ expectedResult: 6484, result: accumulator });
