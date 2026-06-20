import { Router, Request, Response, NextFunction } from "express";

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import { loanApplicationSchema } from "../../validation/loan-application.schema";

import { sendSuccessResponse } from "../../utils/api-response";

import { validateRequest } from "../../middleware/validation.middleware";

import { apiKeyMiddleware } from "../../middleware/api-key.middleware";

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
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzeRequest'
 *
 *     responses:
 *       200:
 *         description: Risk analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyzeSuccessResponse'
 *
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/analyze",

  apiKeyMiddleware,

  validateRequest(loanApplicationSchema, "body"),

  async (req, res, next) => {
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
