import * as Types from "../types";

import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { DB } from "../db";
import { Env } from "../env";
import { inject, injectable } from "inversify";
import { Logger } from "../logger";

@injectable()
export class Server {
  private readonly app: express.Express;

  constructor(
    @inject(Types.Env)
    private readonly env: Env,

    @inject(Types.Logger)
    private readonly logger: Logger,

    @inject(Types.DB)
    private readonly db: DB
  ) {
    this.app = express();

    this.app.use(morgan("dev", { skip: (req) => req.url === "/health" }));

    this.app.use(bodyParser());

    this.app.get("/", (_req, res) => {
      res.status(200).json({ status: "live" });
    });

    this.app.get("/health", (_req, res) => {
      res.status(200).json({ status: "live" });
    });
  }

  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.info("ExpressServer", "Starting ...");

      this.app.listen(this.env.port, "0.0.0.0", () => {
        this.logger.info("ExpressServer", "Started");
        resolve();
      });
    });
  }
}
