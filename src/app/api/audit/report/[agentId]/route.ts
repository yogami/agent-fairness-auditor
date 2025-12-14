import { NextResponse } from 'next/server';
import { GetAuditReport } from '@/application/usecases/GetAuditReport';
import { PostgresAuditRepository } from '@/infrastructure/repositories/PostgresAuditRepository';

const repo = new PostgresAuditRepository();
const useCase = new GetAuditReport(repo);

export async function GET(request: Request, { params }: { params: Promise<{ agentId: string }> }) {
    try {
        const { agentId } = await params;
        const logs = await useCase.execute(agentId);
        return NextResponse.json({ logs });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
