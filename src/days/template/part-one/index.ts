import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");
// eslint-disable-next-line prefer-const
let accumulator = 0;

console.log({ expectedResult: 0, result: accumulator });
