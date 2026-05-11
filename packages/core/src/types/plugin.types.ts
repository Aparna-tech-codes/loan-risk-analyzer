import { RiskRule } from "./rule.types";

export interface RiskPlugin {
  name: string;

  rules?: RiskRule[];
}
