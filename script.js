const { argv } = require("node:process");
const { writeFile, mkdir, cp } = require("node:fs/promises");
const { join } = require("node:path");
const { exec } = require("child_process");

const SESSION = process.env.SESSION;

(async () => {
  const [_, __, verb, year, day] = argv; // 0 - the path, 1 - the filename

  if (!verb || !year || !day) {
    console.error("Please provide verb<get, bp>, year, day");
    return;
  }

  switch (verb) {
    case "get":
      await getInput(year, day);
      break;
    case "bp":
      await createFolderDay(year, day);
      await getInput(year, day);
      break;
    case "p1":
    case "p2":
      const DICT = { p1: "part-one", p2: "part-two" };
      exec(
        `ts-node src/${year}/days/${day}/${DICT[verb]}/index.ts`,
        (error, stdout) => {
          console.log(stdout);
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        }
      );
      break;
    default:
      console.log("Unknown verb", verb);
      break;
  }
})();

// Feat: Get the day input (DONE)
// Save the input to a file in src/days/${day}/input.txt
async function getInput(year, day) {
  const req = new Request(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${SESSION}`,
    },
  });
  const input = await fetch(req).then(async (res) => {
    const text = await res.text();
    return text.slice(0, text.length - 1);
  });

  const path = join(__dirname, `src/${year}/days/${day}/input.txt`);
  await writeFile(path, input)
    .then(() => console.log("Input saved at", path))
    .catch((err) => console.error(err));
}
// Feat: Get the each part example data for a given day

// Feat: Create the boiler plate code for a given day
async function createFolderDay(year, day) {
  const rootPath = join(__dirname, "src", year, "days", day);
  await mkdir(rootPath);

  const templatePathP1 = join(__dirname, "src", "template");
  await cp(templatePathP1, rootPath, { recursive: true });
}

// Feat: Run the code for a given day
