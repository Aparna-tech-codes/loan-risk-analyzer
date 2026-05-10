import { RiskRule } from "../types/rule.types";

export const emiRule: RiskRule = {
  name: "EMI_RULE",

  priority: "NORMAL",

  async execute(applicant) {

    if (
      applicant.monthlyIncome == null ||
      applicant.monthlyEMI == null
    ) {
      return {
        scoreImpact: -20,
        reason: "Income or EMI missing",
      };
    }

    const ratio =
      applicant.monthlyEMI /
      applicant.monthlyIncome;

    if (ratio > 0.6) {
      return {
        scoreImpact: -40,
        reason: "High EMI ratio",
      };
    }

    return {
      scoreImpact: 10,
    };
  },
};