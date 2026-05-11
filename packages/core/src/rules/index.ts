export * from "./credit-score.rule";
export * from "./emi.rule";
export * from "./fraud.rule";

import { creditScoreRule } from "./credit-score.rule";
import { emiRule } from "./emi.rule";
import { fraudRule } from "./fraud.rule";

export const defaultRules = [creditScoreRule, emiRule, fraudRule];
