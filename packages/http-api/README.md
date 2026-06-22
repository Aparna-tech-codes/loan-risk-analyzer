# @loan-risk/http-api

Express HTTP API for Loan Risk Analyzer.

![npm](https://img.shields.io/npm/v/@loan-risk/http-api)

![Build](https://github.com/Aparna-tech-codes/loan-risk-analyzer/actions/workflows/ci.yml/badge.svg)

![Release](https://github.com/Aparna-tech-codes/loan-risk-analyzer/actions/workflows/release.yml/badge.svg)

---

# Features

* Loan Risk Analysis API
* Swagger Documentation
* Redis Caching
* Health Monitoring
* Metrics Endpoint
* OpenTelemetry Tracing
* API Key Authentication
* Usage Tracking
* Free Tier Limits
* Request Compression
* Docker Support
* Docker Health Checks
* TypeScript Support

---

# Installation

```bash
pnpm add @loan-risk/http-api
```

---

# Environment Variables

```env
PORT=4000

REDIS_URL=redis://localhost:6379

API_KEYS=demo-key-1,demo-key-2
```

---

# Redis Setup

Start Redis using Docker:

```bash
docker run -d \
--name redis \
-p 6379:6379 \
redis:latest
```

Verify Redis:

```bash
docker exec -it redis redis-cli ping
```

Expected:

```txt
PONG
```

---

# Start Development Server

```bash
pnpm --filter @loan-risk/http-api dev
```

---

# Swagger Documentation

```txt
http://localhost:4000/docs
```

---

# Authentication

Protected endpoints require an API key.

Example:

```http
x-api-key: demo-key-1
```

If no API key is provided:

```json
{
  "success": false,
  "error": {
    "code": "MISSING_API_KEY"
  }
}
```

---

# Free Tier Limits

Current plan:

```txt
100 requests per day per API key
```

When limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "FREE_TIER_LIMIT_EXCEEDED"
  }
}
```

---

# API Endpoints

## Health Check

```http
GET /api/v1/health
```

---

## Metrics

```http
GET /api/v1/metrics
```

---

## Usage Statistics

```http
GET /api/v1/usage/:apiKey
```

Example:

```http
GET /api/v1/usage/demo-key-1
```

---

## Analyze Loan Risk

```http
POST /api/v1/analyze
```

Headers:

```http
x-api-key: demo-key-1
Content-Type: application/json
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

# Docker

Build Image:

```bash
docker build -t loan-risk-api .
```

Run Container:

```bash
docker run -d \
--name loan-risk-api \
-p 4000:4000 \
-e PORT=4000 \
-e REDIS_URL=redis://host.docker.internal:6379 \
loan-risk-api
```

Check Logs:

```bash
docker logs loan-risk-api
```

Health Check:

```bash
curl http://localhost:4000/api/v1/health
```

---

# CI/CD

GitHub Actions automatically runs:

* Install
* Type Check
* Lint
* Build
* Tests

on every Pull Request and Push.

---

# Automated Releases

Release workflow automatically creates GitHub releases from tagged versions.

Example:

```bash
git tag v1.0.2
git push origin v1.0.2
```

---

# Automated npm Publishing

Packages are automatically published to npm when a GitHub Release is published.

Supported packages:

* @loan-risk/core
* @loan-risk/logger
* @loan-risk/http-api

---

# License

MIT © Aparna Nikam
