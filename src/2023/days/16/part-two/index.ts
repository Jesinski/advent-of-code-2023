import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "../input.txt"), "utf-8");
const lines = inputFile.split("\n").map((e) => e.split(""));
let accumulator = 0;

const m = lines.length;
const n = lines[0].length;
// [x, y, dx, dy]

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
      let tiles = 0;
      if (i == 0) {
        tiles = runBean([i, j, 1, 0]);
      } else if (i == m - 1) {
        tiles = runBean([i, j, -1, 0]);
      } else if (j == 0) {
        tiles = runBean([i, j, 0, 1]);
      } else if (j == n - 1) {
        tiles = runBean([i, j, 0, -1]);
      }
      accumulator = Math.max(accumulator, tiles);
    }
  }
}
function runBean(start: [number, number, number, number]) {
  const toVisit: [number, number, number, number][] = [start];
  const visited = new Set();
  const tiles = new Set();

  while (toVisit.length) {
    const visiting = toVisit.shift();
    if (!visiting) {
      continue;
    }
    const [key, tileKey] = getKey(visiting);
    tiles.add(tileKey);

    const [row, column, dx, dy] = visiting;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    switch (lines[row][column]) {
      case ".": {
        const newRow = row + dx;
        const newColumn = column + dy;
        if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
          toVisit.push([newRow, newColumn, dx, dy]);
        }
        break;
      }

      case "-":
        if (dx == 0) {
          const newRow = row + dx;
          const newColumn = column + dy;
          if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
            toVisit.push([newRow, newColumn, dx, dy]);
          }
        } else {
          const b1Col = column - 1;
          if (b1Col >= 0 && b1Col < n) {
            toVisit.push([row, b1Col, 0, -1]);
          }
          const b2Col = column + 1;
          if (b2Col >= 0 && b2Col < n) {
            toVisit.push([row, b2Col, 0, 1]);
          }
        }
        break;
      case "|":
        if (dy == 0) {
          const newRow = row + dx;
          const newColumn = column + dy;
          if (newRow >= 0 && newRow < m && newColumn >= 0 && newColumn < n) {
            toVisit.push([newRow, newColumn, dx, dy]);
          }
        } else {
          const b1Row = row - 1;
          if (b1Row >= 0 && b1Row < n) {
            toVisit.push([b1Row, column, -1, 0]);
          }
          const b2Row = row + 1;
          if (b2Row >= 0 && b2Row < n) {
            toVisit.push([b2Row, column, 1, 0]);
          }
        }
        break;
      case "/":
        if (dx == 0) {
          if (dy == 1) {
            const newRow = row - 1;
            if (newRow >= 0 && newRow < n) {
              toVisit.push([newRow, column, -1, 0]);
            }
          } else {
            const newRow = row + 1;
            if (newRow >= 0 && newRow < n) {
              toVisit.push([newRow, column, 1, 0]);
            }
          }
        } else {
          if (dx == 1) {
            const newColumn = column - 1;
            if (newColumn >= 0 && newColumn < n) {
              toVisit.push([row, newColumn, 0, -1]);
            }
          } else {
            const newColumn = column + 1;
            if (newColumn >= 0 && newColumn < n) {
              toVisit.push([row, newColumn, 0, 1]);
            }
          }
        }
        break;
      case "\\":
        if (dx == 0) {
          if (dy == 1) {
            const newRow = row + 1;
            if (newRow >= 0 && newRow < n) {
              toVisit.push([newRow, column, 1, 0]);
            }
          } else {
            const newRow = row - 1;
            if (newRow >= 0 && newRow < n) {
              toVisit.push([newRow, column, -1, 0]);
            }
          }
        } else {
          if (dx == 1) {
            const newColumn = column + 1;
            if (newColumn >= 0 && newColumn < n) {
              toVisit.push([row, newColumn, 0, 1]);
            }
          } else {
            const newColumn = column - 1;
            if (newColumn >= 0 && newColumn < n) {
              toVisit.push([row, newColumn, 0, -1]);
            }
          }
        }
        break;
      default:
        break;
    }
  }
  return tiles.size;
}
console.log({ expectedResult: 7846, result: accumulator });

function getKey(node: [number, number, number, number]) {
  return [node.join(","), node.slice(0, 2).join(",")];
}
