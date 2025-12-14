'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [agentId, setAgentId] = useState('agent-test-1');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, content })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) { alert('Error analyzing'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Agent Fairness Auditor
          </h1>
          <p className="text-neutral-400 mt-2">Compliance & Bias Detection Engine</p>
        </header>

        <section className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">Run Audit</h2>
          <input
            value={agentId} onChange={e => setAgentId(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 p-3 rounded"
            placeholder="Agent ID"
          />
          <textarea
            value={content} onChange={e => setContent(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 p-3 rounded h-32"
            placeholder="Paste agent interaction logs here..."
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded font-bold transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze for Bias'}
          </button>
        </section>

        {result && (
          <section className={`p-6 rounded-xl border-2 ${result.flagged ? 'border-red-500 bg-red-950/20' : 'border-green-500 bg-green-950/20'}`}>
            <h3 className="text-2xl font-bold mb-4">
              {result.flagged ? '🚨 FLAGGED FOR REVIEW' : '✅ COMPLIANT'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-neutral-400">Bias Score</div>
                <div className="text-4xl font-bold">{result.biasScore}/100</div>
              </div>
              <div>
                <div className="text-sm text-neutral-400">Tags</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.violationTags.map((t: string) => (
                    <span key={t} className="bg-neutral-900 px-2 py-1 rounded text-sm font-mono border border-neutral-700">{t}</span>
                  ))}
                  {result.violationTags.length === 0 && <span className="text-neutral-500">-</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-700/50 text-sm font-mono text-neutral-400">
              ID: {result.id}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
