import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const [stateRaw, commandsRaw] = inputFile.split("\n\n");
const commands = commandsRaw.split("\n").map((line) => {
  const words = line.split(" ");
  return {
    move: +words[1],
    source: words[3],
    destination: words[5],
  };
});
const state = stateRaw.split("\n").map((e) => e.split(""));
const stacks = new Map();
for (let i = 0; i < state[state.length - 1].length; i++) {
  if (state[state.length - 1][i] != " ") {
    const key = state[state.length - 1][i];
    const crates = [];
    for (let j = state.length - 2; j >= 0 && state[j][i] != " "; j--) {
      crates.push(state[j][i]);
    }
    stacks.set(key, crates);
  }
}

for (const command of commands) {
  const changed = [];
  for (let i = command.move; i > 0; i--) {
    changed.unshift(stacks.get(command.source).pop());
  }
  stacks.get(command.destination).push(...changed);
}
let output = "";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
for (const [_, value] of stacks) {
  output = output.concat(value[value.length - 1]);
}
console.log({ expectedResult: "MGDMPSZTM", result: output });
