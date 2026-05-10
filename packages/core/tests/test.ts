import {
  calculateRisk,
} from "../src";

import {
  Logger,
} from "@loan-risk/logger";

async function run() {

  const logger =
    new Logger({
      debug: true,
    });

  const result =
    await calculateRisk(

      {
        fullName:
          "Aparna Nikam",

        age: 28,

        monthlyIncome:
          90000,

        existingEMI:
          10000,

        monthlyEMI:
          15000,

        requestedLoanAmount:
          500000,

        creditScore: 760,

        employmentType:
          "SALARIED",
      },

      undefined,

      {
        logger,
      }
    );

  console.log(result);
}

run();