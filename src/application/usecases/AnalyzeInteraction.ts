import { IAuditRepository } from '../../domain/interfaces/IAuditRepository';
import { AuditLog } from '../../domain/entities/AuditLog';

export class AnalyzeInteraction {
    private static BIAS_KEYWORDS = ['hate', 'discriminat', 'stupid', 'idiot', 'bias', 'race', 'gender'];

    constructor(private repository: IAuditRepository) { }

    async execute(agentId: string, content: string): Promise<AuditLog> {
        let score = 0;
        const violationTags: string[] = [];
        const lowerContent = content.toLowerCase();

        // Simple keyword analysis
        AnalyzeInteraction.BIAS_KEYWORDS.forEach(keyword => {
            if (lowerContent.includes(keyword)) {
                score += 20;
                violationTags.push(`keyword:${keyword}`);
            }
        });

        // Cap score at 100
        score = Math.min(score, 100);
        const flagged = score >= 50;

        return this.repository.saveLog({
            agentId,
            interactionContent: content,
            biasScore: score,
            flagged,
            violationTags
        });
    }
}
