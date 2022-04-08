import fs from "fs";
import path from "path";

import { Pokedex } from "@levr/pokemon_showdown/data/pokedex";

async function main() {
  console.log("Writing to dex ...");
  const pokedexFilename = path.join(__dirname, "../stats_data/dex.csv");

  const pokedexHeaders = [
    "num",
    "name",
    "s_hp",
    "s_atk",
    "s_def",
    "s_spa",
    "s_spd",
    "s_spe",
    "type1",
    "type2",
  ];

  await buildCSV(
    { filename: pokedexFilename, headers: pokedexHeaders },
    (builder) => {
      for (const species of Object.values(Pokedex)) {
        builder.buildRow([
          species.num,
          species.name,
          species.baseStats.hp,
          species.baseStats.atk,
          species.baseStats.def,
          species.baseStats.spa,
          species.baseStats.spd,
          species.baseStats.spe,
          species.types[0],
          species.types[1] ?? "None",
        ]);
      }
    }
  );
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// -----------------------------------------------------------------------------
// PRIVATE UTILITIES
// -----------------------------------------------------------------------------

interface BuildCSVDef {
  filename: string;
  headers: Array<string>;
}

interface CSVBuilder {
  buildRow(row: Array<unknown>): void;
}

function buildCSV(
  def: BuildCSVDef,
  build: (builder: CSVBuilder) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    let str = def.headers.join(",");

    const builder: CSVBuilder = {
      buildRow(row: Array<unknown>) {
        str += "\n" + row.join(",");
      },
    };

    build(builder);

    fs.writeFile(def.filename, str, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
