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

const app = express();

app.disable("x-powered-by");

const logger = new Logger({
  debug: true,
});

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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * 404 Handler
 */
app.use(notFoundMiddleware);

/**
 * Global Error Handler
 */
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`🚀 HTTP API running on port ${PORT}`);

  logger.info(`📚 Swagger Docs: http://localhost:${PORT}/docs`);
});
