import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(" ").map(Number));

// eslint-disable-next-line prefer-const
let accumulator = 0;

for (const line of lines) {
  let errors = 0;
  let curr = line[0];

  for (let i = 1; i < line.length; i++) {
    const next = line[i];
    const diff = Math.abs(curr - next);
    if (diff > 3 || diff == 0) {
      errors++;
    } else {
      curr = next;
    }
  }

  let valid = errors <= 1;
  errors = 0;
  curr = line[0];
  let next = line[1];
  const results = [curr > next];
  for (let i = 2; i < line.length; i++) {
    curr = next;
    next = line[i];
    const r = curr > next;

    if (results[results.length - 1] > r) {
      errors++;
    }

    results.push(r);
  }
  if (valid && errors <= 1) {
    console.log(line);
    accumulator++;
  }
}
// 603 to high
console.log({ expectedResult: 502, result: accumulator });
