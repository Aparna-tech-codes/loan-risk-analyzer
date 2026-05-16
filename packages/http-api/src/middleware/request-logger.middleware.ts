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

  logger.info(
    `[${req.requestId}] Incoming Request: ${req.method} ${req.originalUrl}`,
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info(
      `[${req.requestId}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
};
