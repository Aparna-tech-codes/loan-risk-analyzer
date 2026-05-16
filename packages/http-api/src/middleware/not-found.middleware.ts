import { Request, Response } from "express";

import { sendErrorResponse } from "../utils/api-response";

import { ERROR_CODES } from "../constants/error-codes";

export function notFoundMiddleware(req: Request, res: Response) {
  return sendErrorResponse(
    res,
    `Route ${req.originalUrl} not found`,
    404,
    undefined,
    ERROR_CODES.ROUTE_NOT_FOUND,
  );
}
