import { Request, Response, NextFunction } from "express";

import { loanApplicationSchema } from "../validation/loan-application.schema";

import { sendSuccessResponse } from "../utils/api-response";

import { performRiskAnalysis } from "../services/risk-analysis.service";

export const analyzeRisk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loanApplicationSchema.parse(req.body);

    const result = await performRiskAnalysis(validatedData);

    return sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
};
