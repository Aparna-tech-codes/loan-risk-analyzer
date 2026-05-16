import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

export function errorHandlerMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const requestId = req.headers["x-request-id"];

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,

      requestId,

      error: {
        code: "VALIDATION_ERROR",

        message: "Validation failed",

        details: error.flatten(),
      },
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      success: false,

      requestId,

      error: {
        code: "INTERNAL_SERVER_ERROR",

        message: error.message,
      },
    });
  }

  return res.status(500).json({
    success: false,

    requestId,

    error: {
      code: "UNKNOWN_ERROR",

      message: "Internal server error",
    },
  });
}
