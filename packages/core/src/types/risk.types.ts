import { RuleExplanation } from "./explanation.types";

export type RiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface LoanApplicant {
  fullName?: string;

  age?: number;

  monthlyIncome?: number;

  existingEMI?: number;

  monthlyEMI?: number;

  requestedLoanAmount?: number;

  creditScore?: number;

  employmentType?:
    | "SALARIED"
    | "SELF_EMPLOYED";

  phone?: string;

  email?: string;
}

export interface RiskResult {
  score: number;

  riskLevel: RiskLevel;

  approved: boolean;

  reasons: string[];

  explanations: RuleExplanation[];
}