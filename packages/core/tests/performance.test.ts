import {
  calculateRisk,
  RiskRule,
} from "../src";

async function run() {

  const applicant = {

    fullName: "Aparna Nikam",

    age: 30,

    monthlyIncome: 80000,

    monthlyEMI: 15000,

    requestedLoanAmount: 500000,

    creditScore: 750,

  };

  const slowRule1: RiskRule = {

    name: "API_1",

  priority: "NORMAL",

    async execute() {

      await new Promise((r) =>
        setTimeout(r, 3000)
      );

      return {
        scoreImpact: -5,
      };
    },
  };

  const slowRule2: RiskRule = {

    name: "API_2",

  priority: "NORMAL",

    async execute() {

      await new Promise((r) =>
        setTimeout(r, 3000)
      );

      return {
        scoreImpact: -10,
      };
    },
  };

  console.time("ENGINE");

  const result =
    await calculateRisk(
      applicant,

      undefined,

      {
        customRules: [
          slowRule1,
          slowRule2,
        ],
      }
    );

  console.timeEnd("ENGINE");

  console.log(result);

}

run();