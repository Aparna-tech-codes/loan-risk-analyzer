import { Request, Response } from "express";

import { getAuditLogs, clearAuditLogs } from "../services/audit.service";

export const getAuditController = (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: getAuditLogs(),
  });
};

export const clearAuditController = (_req: Request, res: Response) => {
  clearAuditLogs();

  res.json({
    success: true,
    message: "Audit logs cleared",
  });
};
