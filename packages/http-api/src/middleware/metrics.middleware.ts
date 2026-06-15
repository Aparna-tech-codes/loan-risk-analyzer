import { Request, Response, NextFunction } from "express";

import { httpRequestCounter } from "../services/metrics.service";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode.toString(),
    });
  });

  next();
};
