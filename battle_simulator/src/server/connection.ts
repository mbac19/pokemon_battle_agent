import { assert, assertDefined } from "../error_utils";
import { BattleStream } from "@levr/pokemon_showdown";
import { Logger } from "../logger";
import { Simulations } from "../simulations";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";

/**
 * Represents a websocket connection with a particular client.
 */
export class Connection {
  public readonly connectionID = uuidv4();

  private isActive: boolean = false;

  private channelID: string | undefined;

  constructor(
    private readonly ws: WebSocket,
    private readonly logger: Logger,
    private readonly simulations: Simulations
  ) {}

  // ---------------------------------------------------------------------------
  // LIFECYCLE
  // ---------------------------------------------------------------------------

  public start() {
    if (this.isActive) {
      return;
    }

    this.ws.on("message", (buffer: Buffer) => {
      this.logger.info("Connection", "Received message");

      const message = buffer.toString();

      if (message.startsWith("channel")) {
        const tokens = message.split(/\s+/g);
        assert(tokens.length === 2, "Invalid socket message");
        const channelID = tokens[1];

        this.logger.info("Connection", `Registering channel: ${channelID}`);

        assert(
          this.simulations.channels[channelID] !== undefined,
          `Could not find battle channel with id: ${channelID}`
        );

        this.channelID = channelID;

        return;
      }

      const channel = this.getChannel();

      channel.write(message);
    });

    this.ws.on("close", (data: unknown) => {
      this.logger.info("Connection", "Closing connection");
      this.isActive = false;
    });

    this.isActive = true;
  }

  public stop() {
    if (!this.isActive) {
      return;
    }
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // PRIVATE UTILITIES
  // ---------------------------------------------------------------------------

  private getChannel(): BattleStream {
    assertDefined(this.channelID);
    return this.simulations.channels[this.channelID];
  }
}
