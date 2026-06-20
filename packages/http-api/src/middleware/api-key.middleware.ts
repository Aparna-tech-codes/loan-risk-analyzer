import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header("x-api-key");

  const allowedKeys = process.env.API_KEYS?.split(",") ?? [];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: {
        code: "MISSING_API_KEY",
        message: "x-api-key header is required",
      },
    });
  }

  if (!allowedKeys.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "API key is invalid",
      },
    });
  }

  next();
};
