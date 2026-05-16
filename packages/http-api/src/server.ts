import express from "express";

import cors from "cors";

import dotenvSafe from "dotenv-safe";

import swaggerUi from "swagger-ui-express";

import { Logger } from "@loan-risk/logger";

import { swaggerSpec } from "./swagger";

import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

import { notFoundMiddleware } from "./middleware/not-found.middleware";

import { requestLoggerMiddleware } from "./middleware/request-logger.middleware";

import { requestIdMiddleware } from "./middleware/request-id.middleware";

import {
  helmetMiddleware,
  rateLimiterMiddleware,
} from "./middleware/security.middleware";

import analyzeRoutes from "./routes/v1/analyze.route";

import healthRoutes from "./routes/v1/health.route";

dotenvSafe.config();

/**
 * Express App
 */
const app = express();

/**
 * Logger
 */
const logger = new Logger({
  debug: true,
});

/**
 * Security
 */
app.disable("x-powered-by");

/**
 * Core Middlewares
 */
app.use(cors());

app.use(helmetMiddleware);

app.use(rateLimiterMiddleware);

app.use(
  express.json({
    limit: "10kb",
  }),
);

/**
 * Request Tracking
 */
app.use(requestIdMiddleware);

app.use(requestLoggerMiddleware);

/**
 * API Routes
 */
app.use("/api/v1", healthRoutes);

app.use("/api/v1", analyzeRoutes);

/**
 * Swagger Documentation
 */
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,

    customSiteTitle: "Loan Risk Analyzer API Docs",
  }),
);

/**
 * Root Endpoint
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,

    message: "Loan Risk Analyzer API",

    documentation: "/docs",

    version: "v1",
  });
});

/**
 * 404 Handler
 */
app.use(notFoundMiddleware);

/**
 * Global Error Handler
 */
app.use(errorHandlerMiddleware);

/**
 * Server
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`🚀 HTTP API running on port ${PORT}`);

  logger.info(`📚 Swagger Docs: http://localhost:${PORT}/docs`);
});
