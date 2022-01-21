import * as env from "env-var";

export interface Env {
  port: number;
}

export function buildEnv(): Env {
  return {
    port: env.get("BATTLE_SIMULATOR_PORT").required().asPortNumber(),
  };
}
