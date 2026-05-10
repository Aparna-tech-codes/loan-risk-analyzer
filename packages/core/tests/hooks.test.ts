import { describe, it, expect } from "vitest";

import { calculateRisk } from "../src";

describe("Hooks System", () => {

  it("should execute hooks", async () => {

    let beforeCalled = false;

    let afterCalled = false;

    await calculateRisk(
      {
        fullName: "Aparna",
        age: 28,
        monthlyIncome: 90000,
        monthlyEMI: 15000,
        requestedLoanAmount: 500000,
        creditScore: 760,
        employmentType: "SALARIED",
      },

      undefined,

      {
        hooks: {

          beforeCalculate() {
            beforeCalled = true;
          },

          afterCalculate() {
            afterCalled = true;
          },
        },
      }
    );

    expect(beforeCalled).toBe(true);

    expect(afterCalled).toBe(true);
  });
});