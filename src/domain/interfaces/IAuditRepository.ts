import { AuditLog, CreateAuditLogInput } from '../entities/AuditLog';

export interface IAuditRepository {
    saveLog(log: CreateAuditLogInput): Promise<AuditLog>;
    getLogsByAgent(agentId: string): Promise<AuditLog[]>;
    getAllLogs(): Promise<AuditLog[]>;
}
