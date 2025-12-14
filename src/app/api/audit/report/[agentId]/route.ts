import { NextResponse } from 'next/server';
import { GetAuditReport } from '@/application/usecases/GetAuditReport';
import { PostgresAuditRepository } from '@/infrastructure/repositories/PostgresAuditRepository';

const repo = new PostgresAuditRepository();
const useCase = new GetAuditReport(repo);

export async function GET(request: Request, { params }: { params: { agentId: string } }) {
    try {
        const logs = await useCase.execute(params.agentId);
        return NextResponse.json({ logs });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
