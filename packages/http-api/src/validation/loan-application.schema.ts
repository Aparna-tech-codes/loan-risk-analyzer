import { z } from "zod";

export const loanApplicationSchema = z.object({
  fullName: z.string().min(2),

  age: z.number().min(18).max(70),

  monthlyIncome: z.number().positive(),

  monthlyEMI: z.number().nonnegative(),

  requestedLoanAmount: z.number().positive(),

  creditScore: z.number().min(300).max(900),

  employmentType: z.enum(["SALARIED", "SELF_EMPLOYED"]),
});

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
