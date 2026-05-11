import { describe, it, expect } from "vitest";

import { calculateRisk } from "../src";

describe("Loan Risk Analyzer", () => {
  it("should calculate loan risk", async () => {
    const result = await calculateRisk({
      fullName: "Aparna",
      age: 28,
      monthlyIncome: 90000,
      monthlyEMI: 15000,
      requestedLoanAmount: 500000,
      creditScore: 760,
      employmentType: "SALARIED",
    });

    expect(result).toBeDefined();

    expect(result.score).toBeGreaterThan(0);

    expect(result.riskLevel).toBeDefined();
  });
});
