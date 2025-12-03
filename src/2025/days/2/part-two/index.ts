import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split(",");
// eslint-disable-next-line prefer-const
let accumulator = 0;
// const lines = ["9934999349-9934999349"];

const t = new Set<number>();
for (const line of lines) {
  const [low, high] = line.split("-").map((n) => +n);

  for (let i = low; i <= high; i++) {
    const iStr = String(i);

    if (iStr.length < 2) {
      continue;
    }

    if (iStr.split("").every((char) => char === iStr.charAt(0))) {
      console.log(i);
      // accumulator += i;
      t.add(i);
      continue;
    }

    for (let x = 2; x < iStr.length; x++) {
      const left = iStr.slice(0, x);

      let valid = true;
      for (let y = x; y < iStr.length; y += x) {
        const nextPart = iStr.slice(y, y + x);
        // console.log("left", left, "next part", nextPart);
        if (left !== nextPart) {
          valid = false;
          break;
        }
      }

      if (valid) {
        console.log(i);
        // accumulator += i;
        t.add(i);
      }
    }
  }
}

accumulator = Array.from(t).reduce((a, b) => a + b);

console.log({ expectedResult: 0, result: accumulator });
