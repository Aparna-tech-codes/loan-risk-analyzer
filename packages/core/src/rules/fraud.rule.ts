import { RiskRule } from "../types/rule.types";

export const fraudRule: RiskRule = {
  name: "FRAUD_RULE",

  priority: "BLOCKER",

  async execute(applicant) {
    if (!applicant.fullName) {
      return {
        scoreImpact: -20,
        reason: "Name missing",
      };
    }

    const suspiciousNames = ["test", "fake", "fraud"];

    const isFraud = suspiciousNames.some((word) =>
      applicant.fullName!.toLowerCase().includes(word),
    );

    if (isFraud) {
      return {
        scoreImpact: -100,
        reject: true,
        reason: "Fraud detected",
      };
    }

    return {
      scoreImpact: 0,
    };
  },
};
