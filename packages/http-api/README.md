# @loan-risk/http-api

Express HTTP API for Loan Risk Analyzer.

![npm](https://img.shields.io/npm/v/@loan-risk/http-api)

---

## Features

* Loan Risk Analysis API
* Swagger Documentation
* Redis Caching
* Health Monitoring
* Metrics Endpoint
* OpenTelemetry Tracing
* API Key Authentication
* Usage Tracking
* Free Tier Limits
* Docker Support
* Request Compression
* TypeScript Support

---

## Installation

```bash
pnpm add @loan-risk/http-api
```

---

## Environment Variables

```env
PORT=4000

REDIS_URL=redis://localhost:6379

API_KEYS=demo-key-1,demo-key-2
```

---

## Start Development Server

```bash
pnpm --filter @loan-risk/http-api dev
```

---

## Swagger Documentation

```txt
http://localhost:4000/docs
```

---

## Authentication

All protected APIs require:

```http
x-api-key: demo-key-1,demo-key-2
```

---

## Free Tier

Current free tier:

```txt
100 requests per day per API key
```

---

## API Endpoints

### Health

```http
GET /api/v1/health
```

### Metrics

```http
GET /api/v1/metrics
```

### Usage

```http
GET /api/v1/usage/:apiKey
```

### Analyze Risk

```http
POST /api/v1/analyze
```

Headers:

```http
x-api-key: demo-key-1,demo-key-2
```

Request:

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

Response:

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

## Docker

Build:

```bash
docker build -t loan-risk-api .
```

Run:

```bash
docker run -d \
--name loan-risk-api \
-p 4000:4000 \
-e PORT=4000 \
-e REDIS_URL=redis://host.docker.internal:6379 \
loan-risk-api
```

---

## License

MIT
