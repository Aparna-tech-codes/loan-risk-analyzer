import { Express } from "express";

import healthRoutes from "./health.route";

import analyzeRoutes from "./analyze.route";
import metaRoutes from "./meta.route";
import cacheRoutes from "./cache.routes";
import metricsRoutes from "./metrics.routes";
import tracingRoutes from "./tracing.routes";
import auditRoutes from "./audit.route";
import usageRoutes from "./usage.routes";
import limitRoutes from "./limit.routes";

export const registerRoutes = (app: Express) => {
  app.use("/api/v1", healthRoutes);

  app.use("/api/v1", analyzeRoutes);

  app.use("/api/v1", metaRoutes);
  app.use("/api/v1", cacheRoutes);
  app.use("/api/v1", metricsRoutes);
  app.use("/api/v1", tracingRoutes);
  app.use("/api/v1", auditRoutes);
  app.use("/api/v1", usageRoutes);
  app.use("/api/v1", limitRoutes);
};
