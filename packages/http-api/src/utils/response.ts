import { Response } from "express";

export function sendSuccessResponse<T>(
  res: Response,
  data: T,
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,

    timestamp: new Date().toISOString(),

    requestId: res.locals.requestId,

    data,
  });
}

export function sendErrorResponse(
  res: Response,
  error: string,
  statusCode = 500,
  details?: unknown,
  code?: string,
) {
  return res.status(statusCode).json({
    success: false,

    timestamp: new Date().toISOString(),

    requestId: res.locals.requestId,

    error,

    code,

    details,
  });
}
