import { NextResponse } from 'next/server';
import { AnalyzeInteraction } from '@/application/usecases/AnalyzeInteraction';
import { PostgresAuditRepository } from '@/infrastructure/repositories/PostgresAuditRepository';

const repo = new PostgresAuditRepository();
const useCase = new AnalyzeInteraction(repo);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await useCase.execute(body.agentId, body.content);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
