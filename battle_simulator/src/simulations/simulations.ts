import Sim from "@levr/pokemon_showdown";

import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class Simulations {
  public readonly channels: Record<string, Sim.BattleStream> = {};

  /**
   * Create a channel for battle streams and returns the id.
   */
  public createChannel(): string {
    const id = uuidv4();
    this.channels[id] = new Sim.BattleStream();
    return id;
  }
}
