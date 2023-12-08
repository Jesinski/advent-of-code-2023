import { readFileSync } from "fs";
import path from "path";

type Node = {
  left: string;
  right: string;
};

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const steps = lines[0];

const nodes = new Map<string, Node>();

let startingNode: Node | undefined;

for (let i = 2; i < lines.length; i++) {
  const matches = lines[i].match(/[A-Z]{3}/g);
  if (!matches) break;

  const [name, left, right] = matches;
  if (name === left && name === right && name != "ZZZ") continue;

  nodes.set(name, { left, right });
  if (name === "AAA") {
    startingNode = nodes.get(name);
  }
}

let currentNode: Node | undefined = startingNode;
let found = false;
let steps2 = 0;
while (!found) {
  const nextMove = steps[steps2 % steps.length];
  switch (nextMove) {
    case "R": {
      if (currentNode!.right === "ZZZ") {
        found = true;
        break;
      }
      currentNode = nodes.get(currentNode!.right);
      break;
    }
    case "L":
      if (currentNode!.left === "ZZZ") {
        found = true;
        break;
      }
      currentNode = nodes.get(currentNode!.left);
      break;
  }
  steps2++;
}

console.log({ expectedResult: 13207, result: steps2 });
