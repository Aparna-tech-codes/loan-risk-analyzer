import { LogLevel, LogMeta } from "./logger.types";

interface LoggerOptions {
  debug?: boolean;
}

export class Logger {
  constructor(private readonly options?: LoggerOptions) {}

  private log(level: LogLevel, message: string, meta?: LogMeta) {
    if (level === "debug" && !this.options?.debug) {
      return;
    }

    const logPayload = {
      timestamp: new Date().toISOString(),

      level,

      message,

      ...meta,
    };

    console.log(JSON.stringify(logPayload));
  }

  info(message: string, meta?: LogMeta) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: LogMeta) {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: LogMeta) {
    this.log("error", message, meta);
  }

  debug(message: string, meta?: LogMeta) {
    this.log("debug", message, meta);
  }
}
