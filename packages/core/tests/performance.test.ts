import { describe, it, expect } from "vitest";

import { calculateRisk } from "../src";

describe("Performance Test", () => {
  it("should process request quickly", async () => {
    const start = performance.now();

    await calculateRisk({
      fullName: "Aparna",

      age: 28,

      monthlyIncome: 90000,

      monthlyEMI: 15000,

      requestedLoanAmount: 500000,

      creditScore: 760,

      employmentType: "SALARIED",
    });

    const end = performance.now();

    const duration = end - start;

    console.log(`Execution Time: ${duration}ms`);

    expect(duration).toBeLessThan(1000);
  });
});
