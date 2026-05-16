export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogMeta {
  requestId?: string;

  method?: string;

  url?: string;

  statusCode?: number;

  duration?: number;

  [key: string]: unknown;
}
