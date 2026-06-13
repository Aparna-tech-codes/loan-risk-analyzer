import { Request, Response } from "express";

import { redisClient } from "../services/cache.service";

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    service: "loan-risk-api",
    timestamp: new Date().toISOString(),
  });
};

export const readinessCheck = async (_req: Request, res: Response) => {
  const redisReady = redisClient.isReady;

  res.status(redisReady ? 200 : 503).json({
    status: redisReady ? "READY" : "NOT_READY",

    dependencies: {
      redis: redisReady ? "UP" : "DOWN",
    },

    timestamp: new Date().toISOString(),
  });
};

export const livenessCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ALIVE",
    timestamp: new Date().toISOString(),
  });
};
