import { Request, Response, NextFunction } from "express";

import { loanApplicationSchema } from "../validation/loan-application.schema";

import { sendSuccessResponse } from "../utils/api-response";

import { performRiskAnalysis } from "../services/risk-analysis.service";

import { AuditService } from "../services/audit.service";

const auditService = new AuditService();
export const analyzeRisk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loanApplicationSchema.parse(req.body);

    auditService.log("RISK_ANALYSIS_STARTED", validatedData);

    const result = await performRiskAnalysis(validatedData);

    auditService.log("RISK_ANALYSIS_COMPLETED", {
      applicant: validatedData.fullName,
      score: result.score,
      riskLevel: result.riskLevel,
      approved: result.approved,
    });

    return sendSuccessResponse(res, result);
  } catch (error) {
    next(error);
  }
};
