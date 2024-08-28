import { readFileSync } from "fs";
import path from "path";

type Node = {
  left: string;
  right: string;
};

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");

const instructions = lines[0];

const nodes = new Map<string, Node>();

const startingNodes: Node[] = [];

for (let i = 2; i < lines.length; i++) {
  const matches = lines[i].match(/[A-Z1-9]{3}/g);
  if (!matches) break;

  const [name, left, right] = matches;
  if (name === left && name === right && name != "ZZZ") continue;

  nodes.set(name, { left, right });
  if (name[2] === "A") {
    startingNodes.push({ left, right });
  }
}

const currentNodes: Node[] = [...startingNodes];
let found = false;
let steps = 0;

const denominators: number[] = [];

for (let i = 0; i < currentNodes.length; i++) {
  steps = 0;
  found = false;
  let currentNode = currentNodes[i];

  while (!found) {
    const nextMove = instructions[steps % instructions.length];
    switch (nextMove) {
      case "R": {
        if (currentNode!.right[2] === "Z") {
          found = true;
          steps++;
          denominators.push(steps);
          break;
        }
        currentNode = nodes.get(currentNode.right) as Node;
        break;
      }
      case "L":
        if (currentNode!.left[2] === "Z") {
          found = true;
          steps++;
          denominators.push(steps);
          break;
        }
        currentNode = nodes.get(currentNode.left) as Node;
        break;
    }
    steps++;
  }
}

const lcm = getLCM(denominators);
console.log({ expectedResult: 12324145107121, result: lcm });

function getLCM(denominators: number[]): number {
  let multiple = denominators[0];

  for (let i = 1; i < denominators.length; i++) {
    multiple = (multiple * denominators[i]) / getHCF(multiple, denominators[i]);
  }

  return multiple;
}
function getHCF(first: number, second: number): number {
  if (first === 1) return second;
  while (second != 0) {
    const temp = second;
    second = first % second;
    first = temp;
  }
  return first;
}
