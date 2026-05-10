import { LoanApplicant } from "./risk.types";

import { RiskConfig } from "./risk-config.types";

import { RiskResult } from "./risk.types";

export interface HookContext {
  applicant: LoanApplicant;

  config?: RiskConfig;

  result?: RiskResult;
}

export interface EngineHooks {

  beforeCalculate?: (
    ctx: HookContext
  ) => Promise<void> | void;

  afterCalculate?: (
    ctx: HookContext
  ) => Promise<void> | void;
}