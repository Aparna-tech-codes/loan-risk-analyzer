import {
  createRiskEngine,
  fraudPlugin,
} from "../src";

async function run() {

  const engine =
    createRiskEngine();

  engine.use(
    fraudPlugin()
  );

  const result =
    await engine.analyze({

      fullName:
        "TEST USER",

      age: 25,

      monthlyIncome:
        50000,

      monthlyEMI:
        10000,

      creditScore:
        720,

      employmentType:
        "SALARIED",
    });

  console.log(result);

  console.log(
    engine.getPlugins()
  );
}

run();