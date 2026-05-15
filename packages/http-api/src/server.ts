import express, { NextFunction, Request, Response } from "express";

import cors from "cors";

import dotenvSafe from "dotenv-safe";

import swaggerUi from "swagger-ui-express";

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import { swaggerSpec } from "./swagger";

import { loanApplicationSchema } from "./validation/loan-application.schema";

import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

import { notFoundMiddleware } from "./middleware/not-found.middleware";

dotenvSafe.config();

const app = express();

const logger = new Logger({
  debug: true,
});

app.use(cors());

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API running successfully
 */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

/**
 * @swagger
 * /analyze:
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
app.post(
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

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`🚀 HTTP API running on port ${PORT}`);

  logger.info(`📚 Swagger Docs: http://localhost:${PORT}/docs`);
});
