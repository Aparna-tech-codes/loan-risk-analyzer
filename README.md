# Loan Risk Analyzer

![CI](https://github.com/Aparna-tech-codes/loan-risk-analyzer/actions/workflows/ci.yml/badge.svg)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

![TurboRepo](https://img.shields.io/badge/TurboRepo-Monorepo-red)

![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)

![npm](https://img.shields.io/npm/v/@loan-risk/core)

## npm Packages

- [@loan-risk/core](https://www.npmjs.com/package/@loan-risk/core)
- [@loan-risk/logger](https://www.npmjs.com/package/@loan-risk/logger)
- [@loan-risk/http-api](https://www.npmjs.com/package/@loan-risk/http-api)

A modern TypeScript-based loan risk analysis engine with plugin architecture, hooks system, HTTP API support, and extensible rule processing.

Built with:

- TypeScript
- Node.js
- PNPM Workspace
- Vitest
- Express

---

# Features

- Rule-based loan risk analysis
- Plugin architecture
- Hook system
- Fraud detection support
- Parallel rule execution
- HTTP API package
- Logger package
- Automated testing
- Monorepo architecture
- Fully typed with TypeScript

---
# Quick Start

```bash
pnpm install
pnpm build
pnpm test
```
# Architecture

This repository follows a modular monorepo architecture using TurboRepo and PNPM workspaces.

Each package is independently buildable, type-safe, and publishable to npm.

The system is designed for:
- extensibility
- plugin-based rule processing
- scalable risk evaluation
- enterprise TypeScript development workflows

# Project Structure

```txt
loan-risk-analyzer/
│
├── packages/
│   ├── core/
│   │   ├── src/
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── logger/
│   │   ├── src/
│   │   └── package.json
│   │
│   └── http-api/
│       ├── src/
│       └── package.json
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

---

# Packages

## `@loan-risk/core`

Core loan risk analysis engine.

Features:

- Rule engine
- Risk scoring
- Plugin support
- Hooks system
- Fraud detection

---

## `@loan-risk/logger`

Reusable logger package.

Features:

- Info logs
- Warning logs
- Error logs
- Debug logs

---

## `@loan-risk/http-api`

Express-based HTTP API for exposing the analyzer.

Features:

- REST API
- Health endpoint
- Risk analysis endpoint

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Aparna-tech-codes/loan-risk-analyzer.git
```

---

## Install Dependencies

```bash
pnpm install
```

---

# Build Project

```bash
pnpm -r build
```

---

# Run Type Check

```bash
pnpm -r exec tsc --noEmit
```

---

# Run Tests

```bash
pnpm test
```

---

# Coverage Report

```bash
pnpm coverage
```

---

# Usage Example

## Basic Usage

```ts
import { calculateRisk } from "@loan-risk/core";

const result = await calculateRisk({
  fullName: "jhon jhon",

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

# Result Example

```json
{
  "score": 85,
  "riskLevel": "LOW",
  "approved": true,
  "reasons": [],
  "explanations": []
}
```

---

# Hooks Example

```ts
import { calculateRisk } from "@loan-risk/core";

await calculateRisk(applicant, undefined, {
  hooks: {
    beforeCalculate: async (ctx) => {
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

# HTTP API

## Start API

```bash
pnpm --filter @loan-risk/http-api dev
```

---

## Health Endpoint

```http
GET /health
```

---

## Analyze Endpoint

```http
POST /analyze
```

### Request

```json
{
  "fullName": "Aparna Nikam",
  "age": 28,
  "monthlyIncome": 90000,
  "monthlyEMI": 15000,
  "requestedLoanAmount": 500000,
  "creditScore": 760,
  "employmentType": "SALARIED"
}
```

---

# Development Scripts

## Build

```bash
pnpm -r build
```

## Test

```bash
pnpm test
```

## Coverage

```bash
pnpm coverage
```

## Type Check

```bash
pnpm -r exec tsc --noEmit
```

---

# Automated Testing

This project uses:

- Vitest
- TypeScript
- Workspace testing

Current tests:

- Core engine tests
- Hooks tests
- Plugin tests
- Fraud detection tests
- Performance tests

---

# CI/CD

GitHub Actions workflow included.

Automatically runs:

- Install
- Type checking
- Build
- Tests

On every push and pull request.

---

# Open Source

This project is open source under the MIT License.

This repository is an independent personal open-source project and has no relation to any external business or company.

---


# License

MIT © Aparna Nikam

See [LICENSE](./LICENSE)
