import express from "express";

import cors from "cors";

import dotenvSafe from "dotenv-safe";

dotenvSafe.config();

import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./swagger";

import { loanApplicationSchema } from "./validation/loan-application.schema";
import { ZodError } from "zod";
const app = express();

const logger = new Logger({
  debug: true,
});

app.use(cors());

app.use(express.json());
app.use(
  "/docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API running successfully
 */
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

/**
 * @swagger
 * /analyze:
 *   post:
 *     summary: Analyze loan applicant risk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               monthlyIncome:
 *                 type: number
 *               creditScore:
 *                 type: number
 *     responses:
 *       200:
 *         description: Risk analysis result
 */
app.post(
  "/analyze",

  async (req, res) => {
    try {
      logger.info("Risk analyze request received");

      const validatedData = loanApplicationSchema.parse(req.body);

      const result = await calculateRisk(
        validatedData,

        undefined,

        {
          logger,
        },
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error("Risk analysis failed");

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.flatten(),
        });
      }

      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`HTTP API running on port ${PORT}`);
});
