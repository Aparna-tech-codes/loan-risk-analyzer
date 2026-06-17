import { Router } from "express";

import {
  getAuditController,
  clearAuditController,
} from "../../controllers/audit.controller";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/audit:
 *   get:
 *     tags:
 *       - Audit
 *     summary:
 *       Get audit logs
 *     responses:
 *       200:
 *         description:
 *           Audit logs retrieved
 */
router.get("/audit", getAuditController);

/**
 * @swagger
 * /api/v1/audit:
 *   delete:
 *     tags:
 *       - Audit
 *     summary:
 *       Clear audit logs
 *     responses:
 *       200:
 *         description:
 *           Logs cleared
 */
router.delete("/audit", clearAuditController);

export default router;
