import prisma from '../db';
import { IAuditRepository } from '../../lib/fairness-auditor/domain/ports/IAuditRepository';
import { CreateAuditLogInput, AuditLog } from '../../lib/fairness-auditor/domain/entities/AuditLog';

export class PostgresAuditRepository implements IAuditRepository {
    async saveLog(input: CreateAuditLogInput): Promise<AuditLog> {
        const log = await prisma.auditLog.create({
            data: {
                agentId: input.agentId,
                interactionContent: input.interactionContent,
                biasScore: input.biasScore,
                flagged: input.flagged,
                violationTags: input.violationTags
            }
        });
        return this.mapToEntity(log);
    }

    async getLogsByAgent(agentId: string): Promise<AuditLog[]> {
        const logs = await prisma.auditLog.findMany({
            where: { agentId },
            orderBy: { createdAt: 'desc' }
        });
        return logs.map(this.mapToEntity);
    }

    async getAllLogs(): Promise<AuditLog[]> {
        const logs = await prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return logs.map(this.mapToEntity);
    }

    private mapToEntity(dbLog: any): AuditLog {
        return {
            id: dbLog.id,
            agentId: dbLog.agentId,
            interactionContent: dbLog.interactionContent,
            biasScore: dbLog.biasScore,
            flagged: dbLog.flagged,
            violationTags: dbLog.violationTags,
            createdAt: dbLog.createdAt
        };
    }
}
