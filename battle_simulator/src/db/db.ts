export interface BattleStream {
  readonly id: string;

  readonly logs: Array<string>;
}

export interface DB {
  // ---------------------------------------------------------------------------
  // LIFECYCLE
  // ---------------------------------------------------------------------------

  start(): Promise<void>;

  stop(): Promise<void>;

  // ---------------------------------------------------------------------------
  // BATTLE STREAM API
  // ---------------------------------------------------------------------------
}
