import { calculateRisk } from "../src";

async function run() {

  const result =
    await calculateRisk({

      age: 25,

      monthlyIncome: 40000,

      existingEMI: 10000,

      creditScore: 250,

      employmentType:
        "SALARIED",
    });

  console.log(result);
}

run();