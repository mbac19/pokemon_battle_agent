import { DB } from "./db";
import { injectable } from "inversify";

@injectable()
export class InMemoryDB implements DB {
  public async start(): Promise<void> {}

  public async stop(): Promise<void> {}
}
