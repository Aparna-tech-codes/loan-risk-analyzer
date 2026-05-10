import { RiskRule } from "../types/rule.types";

export const employmentRule: RiskRule = {
  name: "EMPLOYMENT_RULE",

  async execute(applicant) {

    if (
      applicant.employmentType ===
      "SELF_EMPLOYED"
    ) {
      return {
        scoreImpact: -20,

        reason:
          "Self-employed risk adjustment",
      };
    }

    return {
      scoreImpact: 0,
    };
  },
};