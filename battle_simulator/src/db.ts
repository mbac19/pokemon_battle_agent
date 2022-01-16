import * as Types from "./types";

import { Env } from "./env";
import { inject, injectable } from "inversify";
import { Logger } from "./logger";

@injectable()
export class DB {
  constructor(
    @inject(Types.Env) private readonly env: Env,
    @inject(Types.Logger) private readonly logger: Logger
  ) {}

  public async start() {
    this.logger.info("DB", "Starting ...");
  }

  public async stop() {
    this.logger.info("DB", "Stopping ...");
  }
}
