import { describe, it, expect } from 'vitest';
import { AnalyzeInteraction } from '../../src/lib/fairness-auditor/application/usecases/AnalyzeInteraction';
import { IAuditRepository } from '../../src/lib/fairness-auditor/domain/ports/IAuditRepository';

describe('Fairness Auditor Characterization', () => {
    it('should maintain current bias scoring and flagging behavior', async () => {
        const logs: any[] = [];
        const mockRepo: IAuditRepository = {
            saveLog: async (log) => {
                const saved = { id: 'test-id', ...log, createdAt: new Date() };
                logs.push(saved);
                return saved;
            },
            getLogsByAgent: async () => [],
            getAllLogs: async () => []
        };

        const auditor = new AnalyzeInteraction(mockRepo);

        // Scenario 1: Clean content
        await auditor.execute('agent-1', 'This is a neutral message.');

        // Scenario 2: Moderate bias (below threshold)
        await auditor.execute('agent-1', 'This is stupid.');

        // Scenario 3: High bias (above threshold)
        await auditor.execute('agent-1', 'I hate this stupid bias.');

        expect(logs).toHaveLength(3);

        // Assertions based on current implementation logic (20 points per keyword, flag at 50)
        expect(logs[0].biasScore).toBe(0);
        expect(logs[0].flagged).toBe(false);

        expect(logs[1].biasScore).toBe(20);
        expect(logs[1].flagged).toBe(false);

        expect(logs[2].biasScore).toBe(60);
        expect(logs[2].flagged).toBe(true);
        expect(logs[2].violationTags).toContain('keyword:hate');
    });
});
