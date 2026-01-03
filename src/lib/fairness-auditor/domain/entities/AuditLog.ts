export interface AuditLog {
    id: string;
    agentId: string;
    interactionContent: string;
    biasScore: number; // 0-100, higher is worse (more bias)
    flagged: boolean;
    violationTags: string[];
    createdAt: Date;
}

export type CreateAuditLogInput = Omit<AuditLog, 'id' | 'createdAt'>;
