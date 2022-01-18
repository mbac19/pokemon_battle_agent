import * as Types from "../types";

export type PokemonBattle = unknown;

export interface DB {
  // ---------------------------------------------------------------------------
  // LIFECYCLE
  // ---------------------------------------------------------------------------

  start(): Promise<void>;

  stop(): Promise<void>;

  // ---------------------------------------------------------------------------
  // BATTLE API
  // ---------------------------------------------------------------------------

  genMakeBattle(): Promise<PokemonBattle>;
}
