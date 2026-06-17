import "./tracing";
import express from "express";

import cors from "cors";

import dotenvSafe from "dotenv-safe";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./swagger";

import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

import { notFoundMiddleware } from "./middleware/not-found.middleware";

import { requestIdMiddleware } from "./middleware/request-id.middleware";

import {
  helmetMiddleware,
  rateLimiterMiddleware,
} from "./middleware/security.middleware";

import { registerRoutes } from "./routes/v1/index";

import { logger } from "./services/logger.service";

import { httpLoggerMiddleware } from "./middleware/http-logger.middleware";
import { connectRedis } from "./services/cache.service";
import { metricsMiddleware } from "./middleware/metrics.middleware";
import compression from "compression";
import { auditMiddleware } from "./middleware/audit.middleware";

dotenvSafe.config({
  allowEmptyValues: true,
});
/**
 * Express App
 */
const app = express();

/**
 * Security
 */
app.disable("x-powered-by");

/**
 * Core Middlewares
 */
app.use(cors());

app.use(compression());

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

/**
 * Structured HTTP Logging
 */
app.use(httpLoggerMiddleware);
app.use(auditMiddleware);
app.use(metricsMiddleware);

/**
 * API Routes
 */
registerRoutes(app);

/**
 * Swagger Documentation
 */

app.get("/docs-json", (_req, res) => {
  res.json(swaggerSpec);
});

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

async function bootstrap() {
  await connectRedis();

  app.listen(PORT, () => {
    logger.info(
      {
        port: PORT,
      },
      "HTTP API started",
    );

    logger.info(
      {
        docs: `http://localhost:${PORT}/docs`,
      },
      "Swagger docs available",
    );
  });
}

bootstrap();
