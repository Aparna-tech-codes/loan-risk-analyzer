import { RiskRule } from "../types/rule.types";

export const dtiRule: RiskRule = {
  name: "DTI_RULE",

  priority: "NORMAL",

  async execute(applicant) {
    const existingEMI = applicant.existingEMI ?? 0;

    const monthlyIncome = applicant.monthlyIncome ?? 1;

    const dti = (existingEMI / monthlyIncome) * 100;

    if (dti > 50) {
      return {
        scoreImpact: -25,

        reason: "Debt-to-income ratio too high",
      };
    }

    if (dti > 35) {
      return {
        scoreImpact: -10,

        reason: "Moderate debt-to-income ratio",
      };
    }

    return {
      scoreImpact: 5,

      reason: "Healthy debt-to-income ratio",
    };
  },
};
