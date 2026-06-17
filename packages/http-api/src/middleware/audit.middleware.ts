import { Request, Response, NextFunction } from "express";

import { saveAuditLog } from "../services/audit.service";

export const auditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on("finish", () => {
    saveAuditLog({
      timestamp: new Date().toISOString(),

      requestId: String(req.headers["x-request-id"] ?? ""),

      method: req.method,

      path: req.originalUrl,

      statusCode: res.statusCode,
    });
  });

  next();
};
