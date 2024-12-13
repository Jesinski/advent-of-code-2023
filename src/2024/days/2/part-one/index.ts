import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" ").map(Number));

// eslint-disable-next-line prefer-const
let accumulator = 0;

for (const line of lines) {
  let valid = true;
  let curr = line[0];

  for (let i = 1; i < line.length; i++) {
    const next = line[i];
    const diff = Math.abs(curr - next);
    if (diff > 3 || diff == 0) {
      valid = false;
      break;
    }
    curr = next;
  }

  const results = [];
  curr = line[0];

  for (let i = 1; i < line.length; i++) {
    const next = line[i];
    results.push(curr > next);
    curr = next;
  }

  if (
    valid &&
    (results.every((v) => v == true) || results.every((v) => v == false))
  ) {
    accumulator++;
  }
}

console.log({ expectedResult: 502, result: accumulator });
