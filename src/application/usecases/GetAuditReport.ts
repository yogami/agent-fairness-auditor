import { IAuditRepository } from '../../domain/interfaces/IAuditRepository';
import { AuditLog } from '../../domain/entities/AuditLog';

export class GetAuditReport {
    constructor(private repository: IAuditRepository) { }

    async execute(agentId?: string): Promise<AuditLog[]> {
        if (agentId) {
            return this.repository.getLogsByAgent(agentId);
        }
        return this.repository.getAllLogs();
    }
}
