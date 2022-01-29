import * as Types from "../types";

import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { Connection } from "./connection";
import { DB } from "../db";
import { Env } from "../env";
import { inject, injectable } from "inversify";
import { Logger } from "../logger";
import { WebSocketServer } from "ws";
import { Simulations } from "../simulations";

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
    private readonly db: DB,

    @inject(Types.Simulations)
    private readonly simulations: Simulations
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
      const channelID = this.simulations.createChannel();
      res.status(200).json({ data: { id: channelID } });
    });

    this.wss = new WebSocketServer({ noServer: true, path: "/" });
  }

  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.info("Server", "Starting ...");

      const server = this.app.listen(this.env.port, "0.0.0.0", () => {
        this.logger.info(
          "Server",
          `Started and listening on port: ${this.env.port}`
        );

        resolve();
      });

      this.wss.on("connection", (ws) => {
        const connection = new Connection(ws, this.logger, this.simulations);
        connection.start();

        console.log("CONNECTED");

        ws.on("message", (data) => {
          console.log("MESSAGE 2", data.toString());
          ws.send("received");
        });

        ws.send("CONNECTED");
      });

      server.on("upgrade", (request, socket, head) => {
        console.log("SERVER UPGRADE");
        console.log(request.url);

        this.wss.handleUpgrade(request, socket, head, (ws) => {
          this.wss.emit("connection", ws, request);
        });
      });
    });
  }

  public async stop(): Promise<void> {
    this.logger.warn("Server", "Stop not implemented for Server");
  }
}
