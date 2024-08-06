import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const inputs = inputFile
  .split("\n\n")
  .map((e) => e.split("\n").map((e) => e.split("")));
let accumulator = 0;

for (const input of inputs) {
  // console.log(JSON.stringify(input));
  console.log("processing input");
  const rows = input.length;
  const columns = input[0].length;

  for (let r = 1; r < rows; r++) {
    let perfect = true;
    for (let c = 0; c < columns; c++) {
      const up = input[r - 1][c];
      const down = input[r][c];

      if (up != down) {
        perfect = false;
        break;
      }
    }
    if (perfect) {
      console.log("ok", r);

      for (let d = 0; r - d - 1 >= 0 && r + d < rows; d++) {
        for (let c = 0; c < columns; c++) {
          const up = input[r - d - 1][c];
          const down = input[r + d][c];

          if (up != down) {
            console.log("broke at", r - d - 1, r + d);
            perfect = false;
            break;
          }
        }
      }
      if (perfect) {
        console.log("found horizontal");
        accumulator += r * 100;
      }
    }
  }

  for (let c = 1; c < columns; c++) {
    let perfect = true;
    for (let r = 0; r < rows; r++) {
      const left = input[r][c - 1];
      const right = input[r][c];

      if (left != right) {
        perfect = false;
        break;
      }
    }
    if (perfect) {
      for (let d = 0; c - d - 1 >= 0 && c + d < columns; d++) {
        for (let r = 0; r < rows; r++) {
          const left = input[r][c - 1 - d];
          const right = input[r][c + d];

          if (left != right) {
            perfect = false;
            break;
          }
        }
      }
      if (perfect) {
        console.log("found vertical");
        accumulator += c;
      }
    }
  }
}

console.log({ expectedResult: 27202, result: accumulator });
