import fs from "fs";
import path from "path";

export interface AuditLog {
  timestamp: string;
  requestId: string;
  method: string;
  path: string;
  statusCode: number;
}

const logsDir = path.join(process.cwd(), "logs");
const auditFile = path.join(logsDir, "audit.json");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

if (!fs.existsSync(auditFile)) {
  fs.writeFileSync(auditFile, "[]");
}

export const saveAuditLog = (log: AuditLog) => {
  const existingLogs: AuditLog[] = JSON.parse(
    fs.readFileSync(auditFile, "utf-8"),
  );

  existingLogs.push(log);

  fs.writeFileSync(auditFile, JSON.stringify(existingLogs, null, 2));
};

export const getAuditLogs = (): AuditLog[] => {
  return JSON.parse(fs.readFileSync(auditFile, "utf-8"));
};

export const clearAuditLogs = (): void => {
  fs.writeFileSync(auditFile, "[]");
};
