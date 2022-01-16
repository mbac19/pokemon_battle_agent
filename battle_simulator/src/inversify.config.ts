import * as Types from "./types";

import { buildEnv, Env } from "./env";
import { Container } from "inversify";
import { Logger } from "./logger";
import { Server } from "./server";

export function performBind(container: Container) {
  container.bind<Env>(Types.Env).toDynamicValue(buildEnv);

  container.bind<Server>(Types.Server).to(Server);

  container.bind<Logger>(Types.Logger).to(Logger);
}
