export declare class Logger {
  private debugMode;
  constructor(options?: { debug?: boolean });
  info(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}
