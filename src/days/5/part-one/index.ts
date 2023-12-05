import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n\n");

// console.log(lines);

type SourceToDestination = {
  destination: number;
  source: number;
  range: number;
  difference: number;
};

const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((seed) => +seed);
// console.log(seeds);

const seedToSoil = getMap(1);
const soilToFertilizer = getMap(2);
const fertilizerToWater = getMap(3);
const waterToLight = getMap(4);
const lightToTemperature = getMap(5);
const temperatureToHumidity = getMap(6);
const humidityToLocation = getMap(7);

let lowestLocation = Infinity;

for (const seed of seeds) {
  const soil = getDestination(seedToSoil, seed);
  const fertilizer = getDestination(soilToFertilizer, soil);
  const water = getDestination(fertilizerToWater, fertilizer);
  const light = getDestination(waterToLight, water);
  const temperature = getDestination(lightToTemperature, light);
  const humidity = getDestination(temperatureToHumidity, temperature);
  const location = getDestination(humidityToLocation, humidity);
  lowestLocation = Math.min(lowestLocation, location);
  console.log(
    `Seed ${seed}, soil ${soil}, fertilizer ${fertilizer}, water ${water}, light ${light}, temperature ${temperature}, humidity ${humidity}, location ${location}`
  );
}

console.log({ expectedResult: 35, result: lowestLocation });

function getMap(line: number) {
  return lines[line]
    .split(":\n")[1]
    .split("\n")
    .map((line) => {
      const numbers = line.split(" ");
      const payload = {
        destination: +numbers[0],
        source: +numbers[1],
        range: +numbers[2],
        difference: +numbers[0] - +numbers[1],
      };
      return payload;
    });
}

function getDestination(
  sourceToDestination: SourceToDestination[],
  source: number
): number {
  // console.log({ source });
  for (let i = 0; i < sourceToDestination.length; i++) {
    if (
      source >= sourceToDestination[i].source &&
      source <= sourceToDestination[i].source + sourceToDestination[i].range
    ) {
      // console.log({ sTD: sourceToDestination[i] });
      // console.log("exit:", source + sourceToDestination[i].difference, "\n");

      return source + sourceToDestination[i].difference;
    }
  }

  console.log("exit:", source, "\n");

  return source;
}
