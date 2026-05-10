import {
  calculateRisk,
  HookContext,
} from "../src";

async function run() {

  const applicant = {
    fullName: "Aparna Nikam",

    age: 28,

    monthlyIncome: 90000,

    monthlyEMI: 15000,

    requestedLoanAmount: 500000,

    creditScore: 760,

    employmentType: "SALARIED" as const,
  };

  const result = await calculateRisk(
    applicant,

    undefined,

    {
      hooks: {

        beforeCalculate: async (
          ctx: HookContext
        ) => {

          console.log(
            "ENGINE STARTED"
          );

          console.log(
            "Applicant:",
            ctx.applicant.fullName
          );
        },

        afterCalculate: async (
          ctx: HookContext
        ) => {

          console.log(
            "ENGINE COMPLETED"
          );

          console.log(
            "FINAL RESULT:"
          );

          console.log(
            ctx.result
          );
        },
      },
    }
  );

  console.log(
    "\nFINAL RESULT\n"
  );

  console.log(result);
}

run();