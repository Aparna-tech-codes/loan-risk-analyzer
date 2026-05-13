import { RiskRule } from "./rule.types";

import { EngineHooks } from "./hook.types";

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug?(message: string): void;
}
export interface EngineOptions {
  customRules?: RiskRule[];

  hooks?: EngineHooks;

  logger?: Logger;
}
