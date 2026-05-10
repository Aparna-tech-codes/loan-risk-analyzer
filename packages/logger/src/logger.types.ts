export type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR"
  | "DEBUG";

export interface LoggerOptions {
  debug?: boolean;

  enableTimestamp?: boolean;
}