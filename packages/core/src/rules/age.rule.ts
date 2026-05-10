import { RiskRule } from "../types/rule.types";

export const ageRule: RiskRule = {
  name: "AGE_RULE",

  priority: "NORMAL",

  async execute(applicant, config) {

    if (!applicant.age) {
      return {
        scoreImpact: -20,
        reason: "Age missing",
      };
    }

    if (
      applicant.age < config.minimumAge ||
      applicant.age > config.maximumAge
    ) {
      return {
        scoreImpact: -40,
        reason: "Age outside policy",
      };
    }

    return {
      scoreImpact: 10,
    };
  },
};