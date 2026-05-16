import { Router, Request, Response, NextFunction } from "express";

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import { loanApplicationSchema } from "../../validation/loan-application.schema";
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - age
 *               - monthlyIncome
 *               - monthlyEMI
 *               - requestedLoanAmount
 *               - creditScore
 *               - employmentType
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
 *                 example: SALARIED
 *
 *     responses:
 *       200:
 *         description: Risk analysis completed successfully
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

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
