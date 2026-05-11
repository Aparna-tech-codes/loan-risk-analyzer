import { RiskRule } from "../types/rule.types";

export const dtiRule: RiskRule = {
  name: "DTI_RULE",

  async execute(applicant) {
    const existingEMI = applicant.existingEMI || 0;

    const monthlyIncome = applicant.monthlyIncome || 1;

    const ratio = existingEMI / monthlyIncome;

    if (ratio > 0.6) {
      return {
        scoreImpact: -30,

        reason: "High debt-to-income ratio",
      };
    }

    return {
      scoreImpact: 0,
    };
  },
};
