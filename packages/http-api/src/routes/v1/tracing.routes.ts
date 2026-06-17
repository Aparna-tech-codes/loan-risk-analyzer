import { Router } from "express";

import { trace } from "@opentelemetry/api";

const router: Router = Router();
/**
 * @swagger
 * /api/v1/trace:
 *   get:
 *     tags:
 *       - Tracing
 *     summary: Trace test endpoint
 */
router.get("/trace", async (_req, res) => {
  const tracer = trace.getTracer("loan-risk-api");

  const span = tracer.startSpan("manual-trace");

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    res.json({
      success: true,
      trace: "created",
    });
  } finally {
    span.end();
  }
});

export default router;
