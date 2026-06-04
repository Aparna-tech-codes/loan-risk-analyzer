export class AuditService {
  log(event: string, data: unknown) {
    console.log({
      event,
      data,
      timestamp: new Date().toISOString(),
    });
  }
}

export const auditService = new AuditService();
