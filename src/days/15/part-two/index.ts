import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split(",");
let accumulator = 0;

const boxes: Map<string, number>[] = [];
for (let i = 0; i < 256; i++) {
  boxes.push(new Map());
}

for (const line of lines) {
  if (line[line.length - 1] == "-") {
    const label = line.substring(0, line.length - 1);
    const box = hash(label);
    boxes[box].delete(label);
  } else {
    const [label, value] = line.split("=");
    const box = hash(label);
    boxes[box].set(label, +value);
  }
}

for (let i = 0; i < boxes.length; i++) {
  const boxValue = i + 1;
  let sum = 0;
  const lenses = boxes[i];

  const iter = lenses.entries();
  let curr = iter.next();
  let slot = 1;
  while (curr.value) {
    sum += boxValue * slot * curr.value[1];
    slot++;
    curr = iter.next();
  }
  accumulator += sum;
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
console.log({ expectedResult: 265462, result: accumulator });
