import { injectable } from "inversify";

@injectable()
export class Logger {
  public info(domain: string, msg: string) {
    console.log(`[INFO][${domain}]: ${msg}`);
  }

  public warn(domain: string, msg: string) {
    console.warn(`[WARN][${domain}]: ${msg}`);
  }

  public error(domain: string, msg: string) {
    console.error(`[ERROR][${domain}]: ${msg}`);
  }
}
