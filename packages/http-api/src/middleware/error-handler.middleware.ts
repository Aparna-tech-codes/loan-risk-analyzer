import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import { Logger } from "@loan-risk/logger";

import { sendErrorResponse } from "../utils/api-response";

import { ERROR_CODES } from "../constants/error-codes";

const logger = new Logger({
  debug: true,
});

export function errorHandlerMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error("Request failed");

  if (error instanceof ZodError) {
    return sendErrorResponse(
      res,
      "Validation failed",
      400,
      error.flatten(),
      ERROR_CODES.VALIDATION_ERROR,
    );
  }

  if (error instanceof Error) {
    return sendErrorResponse(
      res,
      error.message,
      500,
      undefined,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
    );
  }

  return sendErrorResponse(
    res,
    "Unknown server error",
    500,
    undefined,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
  );
}
