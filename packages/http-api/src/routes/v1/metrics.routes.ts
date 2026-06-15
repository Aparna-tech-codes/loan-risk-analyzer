import { Router } from "express";

import { getMetrics, metricsRegister } from "../../services/metrics.service";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/metrics:
 *   get:
 *     summary: Prometheus metrics
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: Prometheus metrics
 */
router.get("/metrics", async (_req, res) => {
  res.set("Content-Type", metricsRegister.contentType);

  res.send(await getMetrics());
});

export default router;
