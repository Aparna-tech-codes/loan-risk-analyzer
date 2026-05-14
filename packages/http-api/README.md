# @loan-risk/http-api

Express HTTP API for the Loan Risk Analyzer ecosystem.

![npm](https://img.shields.io/npm/v/@loan-risk/http-api)

---

# Features

- Express server
- Loan risk analysis endpoint
- Health endpoint
- Swagger documentation
- TypeScript support

---

# Installation

```bash
pnpm add @loan-risk/http-api
```

---

# Development

```bash
pnpm --filter @loan-risk/http-api dev
```

---

# API Endpoints

## Health Check

```http
GET /health
```

---

## Analyze Loan Risk

```http
POST /analyze
```

---

# Example Request

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

# Example Response

```json
{
  "success": true,
  "data": {
    "score": 85,
    "riskLevel": "LOW",
    "approved": true
  }
}
```

---

# Swagger Docs

```txt
http://localhost:4000/docs
```

---

# License

MIT