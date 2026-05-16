import { Router, Request, Response, NextFunction } from "express";

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import { loanApplicationSchema } from "../../validation/loan-application.schema";

import { sendSuccessResponse } from "../../utils/api-response";

import { validateRequest } from "../../middleware/validation.middleware";

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
 */
router.post(
  "/analyze",

  validateRequest(loanApplicationSchema),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Risk analyze request received");

      const result = await calculateRisk(req.body, undefined, {
        logger,
      });

      return sendSuccessResponse(res, result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
