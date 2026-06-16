import { Router } from "express";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/meta:
 *   get:
 *     tags:
 *       - Meta
 *     summary: API metadata
 *     description: Returns API version and runtime information
 *     responses:
 *       200:
 *         description: Metadata returned
 */
router.get("/meta", (_req, res) => {
  res.status(200).json({
    success: true,

    data: {
      service: "loan-risk-analyzer",

      version: process.env.npm_package_version ?? "unknown",

      nodeVersion: process.version,

      environment: process.env.NODE_ENV ?? "development",

      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
