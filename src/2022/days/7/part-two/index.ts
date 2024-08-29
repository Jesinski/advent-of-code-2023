import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

const stack = ["."];
const sizes = new Map();
for (let i = 1; i < lines.length; i++) {
  const command = lines[i].split(" ");

  if (command[0] == "dir" || command[1] == "ls") {
    continue;
  }

  if (command[0] == "$") {
    if (command[1] == "cd" && command[2] == "..") {
      stack.pop();
    } else if (command[1] == "cd" && command[2] != "..") {
      stack.push(command[2]);
    }
  } else {
    for (let j = 0; j < stack.length; j++) {
      const dir = stack.slice(0, j + 1).join("/");
      const size = sizes.get(dir) || 0;
      sizes.set(dir, size + +command[0]);
    }
  }
}
const unusedSpace = 70_000_000 - sizes.get(".");
const spaceNeeded = 30_000_000 - unusedSpace;
let min = Infinity;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
for (const [_, value] of sizes) {
  if (value < spaceNeeded) {
    continue;
  }
  if (value == spaceNeeded) {
    min = value;
    break;
  }
  min = Math.min(min, value);
}
accumulator = min;
console.log({ expectedResult: 7068748, result: accumulator });
