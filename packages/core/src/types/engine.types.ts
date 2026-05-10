import { RiskRule } from "./rule.types";

import { EngineHooks } from "./hook.types";

import { Logger } from "@loan-risk/logger";

export interface EngineOptions {

  customRules?: RiskRule[];

  hooks?: EngineHooks;

  logger?: Logger;
}