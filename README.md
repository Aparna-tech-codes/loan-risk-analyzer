# Loan Risk Analyzer

![CI](https://github.com/Aparna-tech-codes/loan-risk-analyzer/actions/workflows/ci.yml/badge.svg)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

![TurboRepo](https://img.shields.io/badge/TurboRepo-Monorepo-red)

![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)

![npm](https://img.shields.io/npm/v/@loan-risk/core)
![Release](https://img.shields.io/github/v/release/Aparna-tech-codes/loan-risk-analyzer)
![npm](https://img.shields.io/npm/v/@loan-risk/http-api)

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

* Rule-based loan risk analysis
* Plugin architecture
* Hook system
* Fraud detection support
* Parallel rule execution
* Express HTTP API
* Swagger API documentation
* API Key Authentication
* Usage Tracking with Redis
* Free Tier Request Limits
* Logger package
* Automated Testing
* CI/CD Pipeline with GitHub Actions
* Automated Release Workflow
* Automated npm Package Publishing
* Monorepo architecture with TurboRepo
* Fully typed with TypeScript


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


- Loan Risk Analysis API
- Swagger Documentation
- Health Endpoint
- API Key Authentication
- Usage Tracking
- Free Tier Limits
- Redis Integration
- Docker Support
- TypeScript Support

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
## Authentication

Protected endpoints require:

```http
x-api-key: YOUR_API_KEY
```

Example:

```bash
curl -X POST http://localhost:4000/api/v1/analyze \
-H "Content-Type: application/json" \
-H "x-api-key: demo-key-1"
```
## Usage Endpoint

```http
GET /api/v1/usage/:apiKey
```

Example:

```http
GET /api/v1/usage/demo-key-1
```

## Free Tier Limits

Default limit:

```txt
100 requests per API key
```

When the limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "USAGE_LIMIT_EXCEEDED",
    "message": "Free tier limit exceeded"
  }
}
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

GitHub Actions workflows included.

## Continuous Integration

Runs on:

- Push
- Pull Request

Checks:

- Install Dependencies
- Type Checking
- Linting
- Build Validation
- Tests

## Release Workflow

Runs automatically when a GitHub Release is published.

Features:

- Build Validation
- Release Verification
- Automated Release Creation

## Automated npm Publishing

Publishes:

- @loan-risk/core
- @loan-risk/logger
- @loan-risk/http-api

through GitHub Actions using npm automation.
---
# Open Source

This project is open source under the MIT License.

This repository is an independent personal open-source project and has no relation to any external business or company.

---


# License

MIT © Aparna Nikam

See [LICENSE](./LICENSE)
