import { describe, it, expect } from "vitest";

import { calculateRisk } from "../src";

describe("Fraud Detection", () => {
  it("should reject fraudulent applicant", async () => {
    const result = await calculateRisk({
      fullName: "Fraud User",

      age: 19,

      monthlyIncome: 10000,

      monthlyEMI: 9000,

      requestedLoanAmount: 5000000,

      creditScore: 300,

      employmentType: "SALARIED",
    });

    expect(result.approved).toBe(false);
  });
});
