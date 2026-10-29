'use client';

import React, { useState } from 'react';
import { AnalysisResult, BulletSuggestion } from '@/lib/types';
import {
  AlertTriangle,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  ThumbsUp,
  RotateCw,
  Wand2,
  FileText
} from 'lucide-react';

interface ActionableSuggestionsProps {
  result: AnalysisResult;
  apiKey: string;
  targetRole: string;
}

export function ActionableSuggestions({
  result,
  apiKey,
  targetRole,
}: ActionableSuggestionsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Custom bullet rewrite state
  const [customBullet, setCustomBullet] = useState('');
  const [customRewriting, setCustomRewriting] = useState(false);
  const [customResult, setCustomResult] = useState<BulletSuggestion | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleRewriteCustom = async () => {
    if (!customBullet.trim()) return;
    setCustomRewriting(true);
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: customBullet,
          targetRole,
          apiKey,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCustomResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCustomRewriting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tailored Professional Summary Recommendation */}
      {result.tailoredSummaryRecommendation && (
        <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 shadow-xl space-y-3 bg-gradient-to-br from-indigo-950/20 via-slate-900/60 to-purple-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-semibold text-white">
                AI-Crafted Executive Summary Recommendation
              </h3>
            </div>
            <button
              onClick={() => handleCopySummary(result.tailoredSummaryRecommendation!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-medium text-indigo-200 transition-colors"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Summary
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            &ldquo;{result.tailoredSummaryRecommendation}&rdquo;
          </p>
        </div>
      )}

      {/* Strengths & Red Flags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-emerald-400" />
            Key Strengths Identified
          </h3>
          <div className="space-y-2.5">
            {result.strengths.map((str, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Detected Red Flags & Weaknesses ({result.redFlags.length})
          </h3>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {result.redFlags.length > 0 ? (
              result.redFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{flag.title}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        flag.severity === 'high'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {flag.severity} priority
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{flag.description}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No high-risk red flags detected. Excellent job!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bullet Point Rewrites (STAR Method) */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              STAR-Framework Bullet Point Transformations
            </h3>
            <p className="text-xs text-slate-400">
              Upgrade passive statements into high-impact, metric-driven accomplishments
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {result.bulletSuggestions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
            >
              {/* Original */}
              <div className="text-xs">
                <span className="text-rose-400 font-semibold uppercase tracking-wider block mb-1">
                  Original:
                </span>
                <p className="text-slate-400 line-through opacity-80 pl-2 border-l-2 border-rose-500/40">
                  {item.original}
                </p>
              </div>

              {/* Improved */}
              <div className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Optimized (STAR Method):
                  </span>
                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-100 font-medium pl-2 border-l-2 border-emerald-500 bg-emerald-500/5 py-1.5 rounded-r">
                  {item.improved}
                </p>
              </div>

              {/* Reason */}
              <div className="text-[11px] text-slate-500 pt-1">
                <strong>Why this works:</strong> {item.reason}
              </div>
            </div>
          ))}
        </div>

        {/* Live Bullet Polisher */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            Polish Any Custom Resume Bullet
          </h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Paste any bullet point you want to upgrade (e.g. Worked on the website checkout)..."
              value={customBullet}
              onChange={(e) => setCustomBullet(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleRewriteCustom}
              disabled={customRewriting || !customBullet.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              {customRewriting ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  Upgrading...
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  Upgrade with STAR
                </>
              )}
            </button>
          </div>

          {customResult && (
            <div className="mt-3 p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-indigo-300">STAR Upgrade Result:</span>
                <button
                  onClick={() => handleCopy(customResult.improved, 999)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/40 transition-colors"
                >
                  {copiedIndex === 999 ? 'Copied!' : 'Copy Result'}
                </button>
              </div>
              <p className="text-white font-medium pl-2 border-l-2 border-indigo-400">
                {customResult.improved}
              </p>
              <p className="text-slate-400 text-[11px]">{customResult.reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
