import { Request, Response, NextFunction } from "express";

import { loanApplicationSchema } from "../validation/loan-application.schema";

import { sendSuccessResponse } from "../utils/api-response";

import { performRiskAnalysis } from "../services/risk-analysis.service";

import { getCache, setCache } from "../services/cache.service";

import { generateCacheKey } from "../utils/cache-key";

export const analyzeRisk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loanApplicationSchema.parse(req.body);

    const cacheKey = generateCacheKey(validatedData);

    const cachedResult = await getCache(cacheKey);

    if (cachedResult) {
      return sendSuccessResponse(res, {
        ...cachedResult,
        cached: true,
      });
    }

    const result = await performRiskAnalysis(validatedData);

    await setCache(cacheKey, result, 300);

    return sendSuccessResponse(res, {
      ...result,
      cached: false,
    });
  } catch (error) {
    next(error);
  }
};
