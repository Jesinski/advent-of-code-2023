const { argv } = require("node:process");
const { writeFile, mkdir, cp } = require("node:fs/promises");
const { join } = require("node:path");

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
      await createFolderDay(day);
      await getInput(year, day);
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
      cookie:
        "session=53616c7465645f5f3ffeb0a5ad9a80e0f26d1f58f7705fc1f19dc8c011166ba7cdd433c1db46a3d977589fedcdb5b4b37a451e77971422085a249b2ce919395a",
    },
  });
  const input = await fetch(req).then((res) => res.text());

  const path = join(__dirname, `src/days/${day}/input.txt`);
  await writeFile(path, input)
    .then(() => console.log("Input saved at", path))
    .catch((err) => console.error(err));
}
// Feat: Get the each part example data for a given day

// Feat: Create the boiler plate code for a given day
async function createFolderDay(day) {
  const rootPath = join(__dirname, "src", "days", day);
  await mkdir(rootPath);

  const templatePathP1 = join(__dirname, "src", "days", "template");
  await cp(templatePathP1, rootPath, { recursive: true });
}

// Feat: Run the code for a given day
