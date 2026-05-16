import { Router, Request, Response, NextFunction } from "express";

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import { loanApplicationSchema } from "../../validation/loan-application.schema";

import { sendSuccessResponse } from "../../utils/api-response";

const router: Router = Router();

const logger = new Logger({
  debug: true,
});

/**
 * @swagger
 * /api/v1/analyze:
 *   post:
 *     summary: Analyze loan applicant risk
 *     tags:
 *       - Risk Analysis
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - fullName
 *               - age
 *               - monthlyIncome
 *               - monthlyEMI
 *               - requestedLoanAmount
 *               - creditScore
 *               - employmentType
 *
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Aparna Nikam
 *
 *               age:
 *                 type: number
 *                 example: 28
 *
 *               monthlyIncome:
 *                 type: number
 *                 example: 90000
 *
 *               monthlyEMI:
 *                 type: number
 *                 example: 15000
 *
 *               requestedLoanAmount:
 *                 type: number
 *                 example: 500000
 *
 *               creditScore:
 *                 type: number
 *                 example: 760
 *
 *               employmentType:
 *                 type: string
 *                 enum:
 *                   - SALARIED
 *                   - SELF_EMPLOYED
 *
 *                 example: SALARIED
 *
 *     responses:
 *       200:
 *         description: Risk analysis successful
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 timestamp:
 *                   type: string
 *                   example: 2026-05-16T10:30:00.000Z
 *
 *                 requestId:
 *                   type: string
 *                   example: req_123456789
 *
 *                 data:
 *                   type: object
 *
 *                   properties:
 *                     score:
 *                       type: number
 *                       example: 100
 *
 *                     riskLevel:
 *                       type: string
 *                       example: LOW
 *
 *                     approved:
 *                       type: boolean
 *                       example: true
 *
 *                     reasons:
 *                       type: array
 *                       items:
 *                         type: string
 *
 *                     explanations:
 *                       type: array
 *
 *                       items:
 *                         type: object
 *
 *                         properties:
 *                           rule:
 *                             type: string
 *                             example: CREDIT_SCORE_RULE
 *
 *                           impact:
 *                             type: number
 *                             example: 20
 *
 *       400:
 *         description: Validation failed
 *
 *       500:
 *         description: Internal server error
 */
router.post(
  "/analyze",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Risk analyze request received");

      const validatedData = loanApplicationSchema.parse(req.body);

      const result = await calculateRisk(validatedData, undefined, {
        logger,
      });

      return sendSuccessResponse(res, result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
