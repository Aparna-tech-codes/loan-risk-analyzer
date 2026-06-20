import { Request, Response, NextFunction } from "express";

import { trackUsage } from "../services/usage.service";
import { checkUsageLimit } from "../services/limit.service";

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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

    const limitInfo = await checkUsageLimit(apiKey);

    if (limitInfo.exceeded) {
      return res.status(429).json({
        success: false,
        error: {
          code: "FREE_TIER_LIMIT_EXCEEDED",
          message: "Daily API limit reached",
        },
        usage: limitInfo.usage,
        limit: limitInfo.limit,
      });
    }

    await trackUsage(apiKey);

    next();
  } catch (error) {
    next(error);
  }
};
