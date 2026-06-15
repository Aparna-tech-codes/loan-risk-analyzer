import { Express } from "express";

import healthRoutes from "./health.route";

import analyzeRoutes from "./analyze.route";
import metaRoutes from "./meta.route";
import cacheRoutes from "./cache.routes";
import metricsRoutes from "./metrics.routes";
export const registerRoutes = (app: Express) => {
  app.use("/api/v1", healthRoutes);

  app.use("/api/v1", analyzeRoutes);

  app.use("/api/v1", metaRoutes);
  app.use("/api/v1", cacheRoutes);
  app.use("/api/v1", metricsRoutes);
};
