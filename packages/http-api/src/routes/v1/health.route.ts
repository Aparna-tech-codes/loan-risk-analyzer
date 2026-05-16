import { Router, Request, Response } from "express";

import { sendSuccessResponse } from "../../utils/api-response";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: API Running
 */
router.get("/health", (_req: Request, res: Response) => {
  return sendSuccessResponse(res, {
    message: "API Running",
  });
});

export default router;
