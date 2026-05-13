import { LoanApplicant, RiskResult } from "../types/risk.types";

import { EngineOptions } from "../types/engine.types";

import { RiskRule } from "../types/rule.types";

import { RiskConfig } from "../types/risk-config.types";

import { defaultRiskConfig } from "../config/default-risk-config";

import { defaultRules } from "../rules";

import { RuleExplanation } from "../types/explanation.types";

export async function calculateRisk(
  applicant: LoanApplicant,

  config: RiskConfig = defaultRiskConfig,

  options?: EngineOptions,
): Promise<RiskResult> {
  const logger = options?.logger;
  let score = 100;

  logger?.info("Risk calculation started");

  await options?.hooks?.beforeCalculate?.({
    applicant,
  });
  const reasons: string[] = [];

  const explanations: RuleExplanation[] = [];

  const allRules: RiskRule[] = [
    ...defaultRules,
    ...(options?.customRules || []),
  ];

  // ==============================
  // BLOCKER RULES
  // ==============================

  const blockerRules = allRules.filter((rule) => rule.priority === "BLOCKER");

  // ==============================
  // NORMAL RULES
  // ==============================

  const normalRules = allRules.filter((rule) => rule.priority !== "BLOCKER");

  // ==============================
  // RUN BLOCKER RULES FIRST
  // ==============================

  for (const rule of blockerRules) {
    logger?.debug?.(`Running rule: ${rule.name}`);
    const result = await rule.execute(applicant, config);

    explanations.push({
      rule: rule.name,

      impact: result.scoreImpact,

      reason: result.reason,
    });

    if (result.reason) {
      reasons.push(result.reason);
    }
    logger?.warn(`Application rejected by ${rule.name}`);
    // FAIL FAST
    if (result.reject === true) {
      return {
        score: 0,

        riskLevel: "HIGH",

        approved: false,

        reasons: ["APPLICATION REJECTED", ...reasons],

        explanations,
      };
    }

    score += result.scoreImpact;
  }

  // ==============================
  // RUN NORMAL RULES IN PARALLEL
  // ==============================

  const results = await Promise.all(
    normalRules.map(async (rule) => {
      logger?.debug?.(`Running rule: ${rule.name}`);
      const result = await rule.execute(applicant, config);

      return {
        ruleName: rule.name,

        result,
      };
    }),
  );

  // ==============================
  // PROCESS RESULTS
  // ==============================

  for (const item of results) {
    score += item.result.scoreImpact;

    explanations.push({
      rule: item.ruleName,

      impact: item.result.scoreImpact,

      reason: item.result.reason,
    });

    if (item.result.reason) {
      reasons.push(item.result.reason);
    }
  }

  // ==============================
  // SCORE LIMITS
  // ==============================

  if (score > 100) {
    score = 100;
  }

  if (score < 0) {
    score = 0;
  }

  // ==============================
  // RISK LEVEL
  // ==============================

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (score < 50) {
    riskLevel = "HIGH";
  } else if (score < 75) {
    riskLevel = "MEDIUM";
  }

  // ==============================
  // FINAL RESULT
  // ==============================
  logger?.info(`Risk calculation completed with score ${score}`);

  const finalResult = {
    score,

    riskLevel,

    approved: score >= config.minimumApprovalScore,

    reasons,

    explanations,
  };

  await options?.hooks?.afterCalculate?.({
    applicant,
    result: finalResult,
  });

  return finalResult;
}
