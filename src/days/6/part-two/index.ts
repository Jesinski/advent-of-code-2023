import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
).replace(/[^0-9|\n]/g, "");

const [time, distance] = inputFile.split("\n");
let accumulator = 0;

for (let timeHolding = 0; timeHolding < +time; timeHolding++) {
  const speed = timeHolding;
  const remainingTime = +time - timeHolding;

  if (speed * remainingTime > +distance) {
    accumulator++;
  }
}

console.log({ expectedResult: 41382569, result: accumulator });
