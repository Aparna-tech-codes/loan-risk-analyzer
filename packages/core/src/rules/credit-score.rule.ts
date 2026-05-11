import { RiskRule } from "../types/rule.types";

export const creditScoreRule: RiskRule = {
  name: "CREDIT_SCORE_RULE",

  priority: "BLOCKER",

  async execute(applicant, config) {
    if (!applicant.creditScore) {
      return {
        scoreImpact: -30,
        reason: "Credit score missing",
      };
    }

    if (applicant.creditScore < config.minimumCreditScore) {
      return {
        scoreImpact: -100,
        reject: true,
        reason: "Low credit score",
      };
    }

    return {
      scoreImpact: 20,
    };
  },
};
