import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import { calculateRisk } from "@loan-risk/core";

import {
  Logger,
} from "@loan-risk/logger";

dotenv.config();

const app = express();

const logger =
  new Logger({
    debug: true,
  });

app.use(cors());

app.use(express.json());

app.get(
  "/health",
  (_req, res) => {

    res.json({
      success: true,
      message: "API Running",
    });
  }
);

app.post(
  "/analyze",

  async (req, res) => {

    try {

      logger.info(
        "Risk analyze request received"
      );

      const result =
        await calculateRisk(

          req.body,

          undefined,

          {
            logger,
          }
        );

      res.json({
        success: true,
        data: result,
      });

    } catch (error) {

      logger.error(
        "Risk analysis failed"
      );

      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);

const PORT =
  process.env.PORT || 4000;

app.listen(PORT, () => {

  logger.info(
    `HTTP API running on port ${PORT}`
  );
});