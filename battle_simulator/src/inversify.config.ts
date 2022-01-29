import * as Types from "./types";

import { buildEnv, Env } from "./env";
import { Container } from "inversify";
import { DB, InMemoryDB } from "./db";
import { Logger } from "./logger";
import { Server } from "./server";
import { Simulations } from "./simulations";

export function performBind(container: Container) {
  container.bind<Env>(Types.Env).toDynamicValue(buildEnv);

  container.bind<DB>(Types.DB).to(InMemoryDB);

  container.bind<Server>(Types.Server).to(Server);

  container.bind<Simulations>(Types.Simulations).to(Simulations);

  container.bind<Logger>(Types.Logger).to(Logger);
}
