import { RiskConfig } from "../types/risk-config.types";

export const defaultRiskConfig: RiskConfig = {
  minimumCreditScore: 650,

  minimumAge: 21,

  maximumAge: 60,

  minimumApprovalScore: 60,
};