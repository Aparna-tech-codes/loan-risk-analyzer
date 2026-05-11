import { RiskPlugin } from "../types/plugin.types";

import { fraudRule } from "../rules/fraud.rule";

export function fraudPlugin(): RiskPlugin {
  return {
    name: "fraud-plugin",

    rules: [fraudRule],
  };
}
