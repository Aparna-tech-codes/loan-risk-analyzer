import {
  LoanApplicant,
} from "./risk.types";

import {
  RiskConfig,
} from "./risk-config.types";

export interface RuleResult {

  scoreImpact: number;

  reject?: boolean;

  reason?: string;
}

export interface RiskRule {

  name: string;

  priority?:
    | "BLOCKER"
    | "NORMAL";

  execute(
    applicant: LoanApplicant,
    config: RiskConfig
  ): Promise<RuleResult>;
}