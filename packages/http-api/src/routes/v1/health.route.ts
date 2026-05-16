import { Router } from "express";

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
 */

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

export default router;
