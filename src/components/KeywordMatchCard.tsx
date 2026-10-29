'use client';

import React, { useState } from 'react';
import { AnalysisResult, KeywordMatch } from '@/lib/types';
import { Check, Plus, Tag, HelpCircle, AlertCircle } from 'lucide-react';

interface KeywordMatchCardProps {
  result: AnalysisResult;
}

export function KeywordMatchCard({ result }: KeywordMatchCardProps) {
  const [filter, setFilter] = useState<'all' | 'matched' | 'missing'>('all');

  const matched = result.keywords.matched;
  const missing = result.keywords.missing;

  const displayedKeywords: { item: KeywordMatch; isMatched: boolean }[] = [];

  if (filter === 'all' || filter === 'matched') {
    matched.forEach(item => displayedKeywords.push({ item, isMatched: true }));
  }
  if (filter === 'all' || filter === 'missing') {
    missing.forEach(item => displayedKeywords.push({ item, isMatched: false }));
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-400" />
            ATS Keyword & Skill Match Analysis
          </h3>
          <p className="text-xs text-slate-400">
            Compare skills in your resume against industry benchmarks and job requirements
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 self-start text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({matched.length + missing.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('matched')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'matched' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matched ({matched.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('missing')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'missing' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing ({missing.length})
          </button>
        </div>
      </div>

      {/* Keywords Display Grid */}
      {displayedKeywords.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-2">
          {displayedKeywords.map(({ item, isMatched }, idx) => (
            <div
              key={`${item.keyword}-${idx}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isMatched
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/15'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/15'
              }`}
            >
              {isMatched ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span className="capitalize">{item.keyword}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase ${
                isMatched ? 'bg-emerald-950/60 text-emerald-400' : 'bg-rose-950/60 text-rose-400'
              }`}>
                {item.category.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-slate-500">
          No keywords match the selected filter.
        </div>
      )}

      {/* Advice Note */}
      {missing.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>ATS Recommendation:</strong> We identified{' '}
            <span className="font-bold text-amber-300">{missing.length} missing keywords</span> present in the job posting that are absent from your resume. Incorporating these naturally into your work experience or skills section can significantly raise your interview callback probability.
          </div>
        </div>
      )}
    </div>
  );
}
