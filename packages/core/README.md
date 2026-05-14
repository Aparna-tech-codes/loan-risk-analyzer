# @loan-risk/core

Core TypeScript loan risk analysis engine with plugin architecture, hooks system, and extensible rule processing.

![npm](https://img.shields.io/npm/v/@loan-risk/core)

---

# Installation

```bash
pnpm add @loan-risk/core
```

---

# Features

- Risk scoring engine
- Plugin architecture
- Hooks support
- Fraud detection
- Type-safe APIs
- Extensible rule processing

---

# Usage

```ts
import { calculateRisk } from "@loan-risk/core";

const result = await calculateRisk({
  fullName: "Aparna Nikam",
  age: 28,
  monthlyIncome: 90000,
  monthlyEMI: 15000,
  requestedLoanAmount: 500000,
  creditScore: 760,
  employmentType: "SALARIED",
});

console.log(result);
```

---

# Example Result

```json
{
  "score": 85,
  "riskLevel": "LOW",
  "approved": true
}
```

---

# Hooks Example

```ts
await calculateRisk(applicant, undefined, {
  hooks: {
    beforeCalculate: async () => {
      console.log("Started");
    },

    afterCalculate: async (ctx) => {
      console.log(ctx.result);
    },
  },
});
```

---

# Plugin Example

```ts
import { createRiskEngine } from "@loan-risk/core";

const engine = createRiskEngine();

engine.use({
  name: "CUSTOM_PLUGIN",

  rules: [
    {
      name: "CUSTOM_RULE",

      async execute() {
        return {
          scoreImpact: -5,
        };
      },
    },
  ],
});
```

---

# License

MIT