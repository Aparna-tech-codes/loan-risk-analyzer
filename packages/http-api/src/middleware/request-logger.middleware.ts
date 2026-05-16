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

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
};
