import { Router } from "express";

import { getUsageController } from "../../controllers/usage.controller";

const router: Router = Router();
/**
 * @swagger
 * /api/v1/usage/{apiKey}:
 *   get:
 *     summary: Get API usage count
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
 *         description: Usage retrieved
 */
router.get("/usage/:apiKey", getUsageController);

export default router;
