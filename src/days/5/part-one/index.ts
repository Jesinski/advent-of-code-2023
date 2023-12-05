import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n\n");

console.log(lines);

const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((seed) => +seed);
// console.log(seeds);

const seedToSoil = getRangeMap(1);
const soilToFertilizer = getRangeMap(2);
const fertilizerToWater = getRangeMap(3);
const waterToLight = getRangeMap(4);
const lightToTemperature = getRangeMap(5);
const temperatureToHumidity = getRangeMap(6);
const humidityToLocation = getRangeMap(7);

let lowestLocation = Infinity;

for (const seed of seeds) {
  let soil: number;
  let fertilizer: number;

  if (seedToSoil.has(seed)) {
    soil = seedToSoil.get(seed) as number;
  } else {
    soil = seed;
  }

  if (soilToFertilizer.has(soil)) {
    fertilizer = soilToFertilizer.get(soil) as number;
  } else {
    fertilizer = soil;
  }

  const water = fertilizerToWater.get(fertilizer) || fertilizer;
  const light = waterToLight.get(water) || water;
  const temperature = lightToTemperature.get(light) || light;
  const humidity = temperatureToHumidity.get(temperature) || temperature;
  const location = humidityToLocation.get(humidity) || humidity;
  lowestLocation = Math.min(lowestLocation, location);
  console.log(
    `Seed ${seed}, soil ${soil}, fertilizer ${fertilizer}, water ${water}, light ${light}, temperature ${temperature}, humidity ${humidity}, location ${location}`
  );
}

console.log({ expectedResult: 35, result: lowestLocation });

function getRangeMap(line: number) {
  const sourceToDestination = new Map<number, number>();
  lines[line]
    .split(":\n")[1]
    .split("\n")
    .forEach((line) => {
      const numbers = line.split(" ");
      const payload = {
        destination: +numbers[0],
        source: +numbers[1],
        range: +numbers[2],
        difference: +numbers[1] - +numbers[0],
      };

      for (let i = 0; i < payload.range; i++) {
        sourceToDestination.set(payload.source + i, payload.destination + i);
      }
    });
  return sourceToDestination;
}
