import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const times = lines[0].match(/\d+/g)?.map((value) => +value) || [];
const distances = lines[1].match(/\d+/g)?.map((value) => +value) || [];
const accumulator = new Array(distances.length).fill(0);

console.log({ times, distances });

for (let i = 0; i < times.length; i++) {
  for (let timeHolding = 0; timeHolding < times[i]; timeHolding++) {
    const speed = timeHolding;
    const remainingTime = times[i] - timeHolding;

    console.log({ speed, remainingTime });
    if (speed * remainingTime > distances[i]) {
      accumulator[i]++;
    }
  }
}

const result = accumulator.reduce((prev, curr) => prev * curr, 1);
console.log({ expectedResult: 0, result: result });
