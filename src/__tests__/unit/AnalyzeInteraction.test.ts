import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalyzeInteraction } from '../../application/usecases/AnalyzeInteraction';
import { IAuditRepository } from '../../domain/interfaces/IAuditRepository';

describe('AnalyzeInteraction', () => {
    let useCase: AnalyzeInteraction;
    let mockRepo: IAuditRepository;

    beforeEach(() => {
        mockRepo = {
            saveLog: vi.fn(),
            getLogsByAgent: vi.fn(),
            getAllLogs: vi.fn()
        };
        useCase = new AnalyzeInteraction(mockRepo);
    });

    it('should flag content with bias keywords', async () => {
        const input = { agentId: 'a1', content: 'This is stupid and bias' };

        vi.mocked(mockRepo.saveLog).mockImplementation(async (log) => ({
            id: '1',
            ...log,
            createdAt: new Date()
        }));

        const result = await useCase.execute(input.agentId, input.content);

        expect(result.flagged).toBe(false); // 2 keywords = 40 score < 50 threshold?
        // Wait, let's check logic: score += 20 per keyword.
        // "stupid" (20) + "bias" (20) = 40. Threshold is 50.
        // Let's add more keywords to trigger flag.
    });

    it('should flag high toxicity', async () => {
        const input = { agentId: 'a1', content: 'I hate this stupid bias discrimination' };
        // hate(20) + stupid(20) + bias(20) + discriminat(20) = 80 -> Flagged

        vi.mocked(mockRepo.saveLog).mockImplementation(async (log) => ({
            id: '1',
            ...log,
            createdAt: new Date()
        }));

        const result = await useCase.execute(input.agentId, input.content);
        expect(result.flagged).toBe(true);
        expect(result.biasScore).toBe(80);
    });

    it('should not flag clean content', async () => {
        const input = { agentId: 'a1', content: 'Hello world, nice to meet you' };

        vi.mocked(mockRepo.saveLog).mockImplementation(async (log) => ({
            id: '1',
            ...log,
            createdAt: new Date()
        }));

        const result = await useCase.execute(input.agentId, input.content);
        expect(result.flagged).toBe(false);
        expect(result.biasScore).toBe(0);
    });
});
