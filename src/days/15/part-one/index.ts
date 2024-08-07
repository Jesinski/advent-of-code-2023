import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split(",");
let accumulator = 0;

for (const line of lines) {
  const temp = hash(line);
  accumulator += temp;
}

function hash(input: string): number {
  let initialValue = 0;

  for (let i = 0; i < input.length; i++) {
    const asciiValue = input.charCodeAt(i);
    initialValue += asciiValue;
    initialValue *= 17;
    initialValue %= 256;
  }

  return initialValue;
}
console.log({ expectedResult: 508552, result: accumulator });
