import "reflect-metadata";

import * as Types from "./types";

import { Container } from "inversify";
import { performBind } from "./inversify.config";
import { Server } from "./server";

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const container = new Container({ defaultScope: "Singleton" });

  performBind(container);

  const server = container.get<Server>(Types.Server);

  await server.start();
}
