import { NextFunction, Request, Response } from "express";

import { Logger } from "@loan-risk/logger";

const logger = new Logger({
  debug: true,
});

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  logger.info("Incoming Request", {
    requestId: req.requestId,

    method: req.method,

    url: req.originalUrl,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("Request Completed", {
      requestId: req.requestId,

      method: req.method,

      url: req.originalUrl,

      statusCode: res.statusCode,

      duration,
    });
  });

  next();
};
