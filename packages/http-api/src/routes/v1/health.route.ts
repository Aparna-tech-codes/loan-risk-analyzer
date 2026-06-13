import { Router } from "express";

import {
  healthCheck,
  readinessCheck,
  livenessCheck,
} from "../../controllers/health.controller";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health Check
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/health", healthCheck);

/**
 * @swagger
 * /api/v1/ready:
 *   get:
 *     tags:
 *       - Health
 *     summary: Readiness Check
 *     responses:
 *       200:
 *         description: Service ready
 *       503:
 *         description: Service not ready
 */
router.get("/ready", readinessCheck);

/**
 * @swagger
 * /api/v1/live:
 *   get:
 *     tags:
 *       - Health
 *     summary: Liveness Check
 *     responses:
 *       200:
 *         description: Service alive
 */
router.get("/live", livenessCheck);

export default router;
