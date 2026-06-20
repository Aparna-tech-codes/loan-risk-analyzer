import { Router } from "express";

import { getLimitController } from "../../controllers/limit.controller";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/limits/{apiKey}:
 *   get:
 *     summary: Get API usage limits
 *     tags:
 *       - Usage
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Limit information
 */

router.get("/limits/:apiKey", getLimitController);

export default router;
