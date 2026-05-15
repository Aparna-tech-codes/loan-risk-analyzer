import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

export function errorHandlerMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.flatten(),
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
