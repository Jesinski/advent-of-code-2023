import { readFileSync } from "fs";
import path from "path";

// eslint-disable-next-line prefer-const
let accumulator = 0;

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const [workflowsRaw] = inputFile.split("\n\n").map((line) => line.split("\n"));

const workflows = new Map([
  ["A", ["A"]],
  ["R", ["R"]],
]);
workflowsRaw.forEach((workflow) => {
  const name = workflow.slice(0, workflow.indexOf("{"));
  const rules = workflow
    .slice(workflow.indexOf("{") + 1, workflow.length - 1)
    .split(",");
  workflows.set(name, rules);
});
console.log(workflows);

type Input = {
  [key: string]: number;
};

const START = workflows.get("in");
if (!START) {
  throw Error("Missing starting point");
}
for (let x = 1; x <= 4000; x++) {
  for (let m = 1; m <= 4000; m++) {
    for (let a = 1; a <= 4000; a++) {
      for (let s = 1; s <= 4000; s++) {
        const input = {
          x,
          m,
          a,
          s,
        };
        if (process(input, START)) {
          accumulator++;
        }
      }
    }
  }
}
// 256000000000000;
// 167409079868000;
function process(input: Input, workflow: string[]): boolean {
  let r = 0;
  let rule = workflow[r];

  while (
    rule != undefined &&
    rule != "A" &&
    rule != "R" &&
    rule.includes(":") &&
    r < workflow.length
  ) {
    r++;
    const [ruleRaw, consequence] = rule.split(":");
    const key = ruleRaw[0];
    const conditional = ruleRaw[1];
    const value = +ruleRaw.slice(2);

    switch (conditional) {
      case ">":
        if (input[key] > value) {
          const nextWorkflow = workflows.get(consequence);
          if (!nextWorkflow) {
            throw Error(`Missing workflow ${consequence}`);
          }
          return process(input, nextWorkflow);
        } else {
          rule = workflow[r];
        }
        break;
      case "<":
        if (input[key] < value) {
          const nextWorkflow = workflows.get(consequence);
          if (!nextWorkflow) {
            throw Error(`Missing workflow ${consequence}`);
          }
          return process(input, nextWorkflow);
        } else {
          rule = workflow[r];
        }
        break;
      default:
    }
  }

  switch (rule) {
    case "A":
      return true;
    case "R":
      return false;
    default: {
      if (!rule) {
        throw Error(`WTF ${rule}`);
      }
      const nextWorkflow = workflows.get(rule);
      if (!nextWorkflow) {
        throw Error(`Missing workflow ${rule}`);
      }
      return process(input, nextWorkflow);
    }
  }
}

console.log({ expectedResult: 456651, result: accumulator });
