import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n\n").map((e) => e.split("\n"));
// eslint-disable-next-line prefer-const
let accumulator = 0;

class Monkey {
  inspections: number;
  items: number[];
  operation: string[];
  test: {
    value: number;
    correct: number;
    wrong: number;
  };
  constructor(
    items: number[],
    operation: string[],
    value: number,
    correct: number,
    wrong: number
  ) {
    this.inspections = 0;
    this.items = items;
    this.operation = operation;
    this.test = { value, correct, wrong };
  }
}
const monkeys: Monkey[] = [];
const divs: number[] = [];
for (const line of lines) {
  // const monkeyIndex = +line[0].charAt(7);
  const items = line[1].split(": ")[1].split(", ").map(Number);
  const operation = line[2].split("= ")[1].split(" ");
  const value = +line[3].slice(21);
  divs.push(value);
  const correct = +line[4][line[4].length - 1];
  const wrong = +line[5][line[5].length - 1];
  monkeys.push(new Monkey(items, operation, value, correct, wrong));
}
const llm = divs.reduce((acc, val) => acc * val, 1);
for (let i = 0; i < 10_000; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const monkey = monkeys[j];

    while (monkey.items.length) {
      monkey.inspections++;
      let item = monkey.items.shift();
      if (!item) {
        continue;
      }

      item = calculateWorry(item, monkey.operation);
      item = Math.floor(item % llm);

      if (item % monkey.test.value == 0) {
        monkeys[monkey.test.correct].items.push(item);
      } else {
        monkeys[monkey.test.wrong].items.push(item);
      }
    }
  }
}
for (const monkey of monkeys) {
  console.log(monkey.items);
  console.log(monkey.inspections);
}

monkeys.sort((a, b) => b.inspections - a.inspections);
accumulator = monkeys[0].inspections * monkeys[1].inspections;

function calculateWorry(value: number, operation: string[]) {
  const n1 = operation[0] == "old" ? value : +operation[2];
  const n2 = operation[2] == "old" ? value : +operation[2];
  switch (operation[1]) {
    case "+":
      return n1 + n2;
    case "*":
      return n1 * n2;
    case "/":
      return n1 / n2;
    case "-":
      return n1 - n2;
    default:
      return value;
  }
}
console.log({ expectedResult: 15310845153, result: accumulator });
