/**
 * OpenAPI JSON Endpoint for Agent Fairness Auditor
 * GET /api/openapi.json
 */

import { NextResponse } from 'next/server';

export async function GET() {
    const spec = {
        openapi: '3.0.3',
        info: {
            title: 'Agent Fairness Auditor API',
            version: '1.0.0',
            description: 'Offline/async bias auditing, safety scoring, and compliance reporting for AI agents.'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local development' }
        ],
        paths: {
            '/api/audit': {
                post: {
                    summary: 'Submit content for fairness audit',
                    operationId: 'submitAudit',
                    tags: ['Audit'],
                    responses: { '200': { description: 'Audit submitted' } }
                },
                get: {
                    summary: 'Get audit results',
                    operationId: 'getAuditResults',
                    tags: ['Audit'],
                    responses: { '200': { description: 'Audit results' } }
                }
            }
        }
    };

    return NextResponse.json(spec, {
        headers: { 'Content-Type': 'application/json' }
    });
}
