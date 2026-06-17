import { z } from "zod";

export const analyzeSchema = z.object({
  applicantName: z.string().min(2),

  annualIncome: z.number().positive(),

  loanAmount: z.number().positive(),

  creditScore: z.number().min(300).max(850),
});
