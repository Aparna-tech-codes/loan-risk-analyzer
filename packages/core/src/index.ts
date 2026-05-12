// ENGINE
export { calculateRisk } from "./engine/risk-engine";

// TYPES
export type { LoanApplicant, RiskResult, RiskLevel } from "./types/risk.types";

export type { RiskRule, RuleResult } from "./types/rule.types";

export type { RiskConfig } from "./types/risk-config.types";

export type { EngineOptions } from "./types/engine.types";

export type { HookContext, EngineHooks } from "./types/hook.types";

// CONFIG
export { defaultRiskConfig } from "./config/default-risk-config";

// RULES
export { defaultRules } from "./rules";
export * from "./engine/create-risk-engine";
export * from "./plugins/fraud.plugin";

export * from "./engine/risk-engine";

export * from "./types/risk.types";
export * from "./types/rule.types";
export * from "./types/engine.types";
export * from "./types/hook.types";

export * from "./plugins/fraud.plugin";
