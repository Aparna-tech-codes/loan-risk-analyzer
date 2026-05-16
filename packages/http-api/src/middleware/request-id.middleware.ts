import { randomUUID } from "crypto";

import { NextFunction, Request, Response } from "express";

export function requestIdMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = randomUUID();

  res.locals.requestId = requestId;

  next();
}
