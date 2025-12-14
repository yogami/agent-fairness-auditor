# Agent Fairness Auditor

Compliance and bias detection service for AI Agent interactions.

## 🚀 Part of Multi-Agent Communication Suite (App 5 of 5)

### Features
- **Bias Detection**: Keyword-based analysis for token toxicity.
- **Audit Logging**: Immutable record of agent interactions.
- **Compliance Dash**: Visual report of flagged content.
- **Postgres Backend**: Secure storage of audit trails.

### Tech Stack
- Next.js 15 (App Router)
- Prisma 7 + Postgres (Railway/Tembo)
- Vitest + Playwright

### Quick Start
```bash
npm install
npx prisma generate
npm run dev
```

### API
- `POST /api/audit/analyze` - Submit content for audit
- `GET /api/audit/report/[agentId]` - Get agent history
