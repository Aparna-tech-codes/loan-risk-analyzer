import { Router } from "express";

import { sendSuccessResponse } from "../../utils/api-response";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/meta:
 *   get:
 *     summary: API metadata
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API metadata response
 */
router.get("/meta", (_req, res) => {
  return sendSuccessResponse(res, {
    name: "Loan Risk Analyzer API",
    version: "1.0.1",
    environment: process.env.NODE_ENV || "development",
  });
});

export default router;
