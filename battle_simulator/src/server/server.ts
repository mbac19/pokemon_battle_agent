import * as Types from "../types";

import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { DB } from "../db";
import { Env } from "../env";
import { inject, injectable } from "inversify";
import { Logger } from "../logger";
import { v4 as uuidv4 } from "uuid";
import { WebSocketServer } from "ws";

@injectable()
export class Server {
  private readonly app: express.Express;

  private readonly wss: WebSocketServer;

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

    this.app.post("/channel", (req, res) => {
      res.status(500).json({ error: "NYI" });
    });

    this.wss = new WebSocketServer({ noServer: true, path: "/websockets" });
  }

  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.info("Server", "Starting ...");

      this.app.listen(this.env.port, "0.0.0.0", () => {
        this.logger.info(
          "Server",
          `Started and listening on port: ${this.env.port}`
        );

        resolve();
      });

      this.wss.on("connection", (ws) => {
        console.log("CONNECTED");

        this.wss.on("message", (data) => {
          console.log("MESSAGE", data);
          ws.send("received");
        });

        ws.send("CONNECTED");
      });
    });
  }

  public async stop(): Promise<void> {
    this.logger.warn("Server", "Stop not implemented for Server");
  }
}
