'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { CheckCircle2, XCircle, LayoutList, ChevronRight } from 'lucide-react';
import { STANDARD_ATS_SECTIONS } from '@/lib/atsRules';

interface SectionBreakdownProps {
  result: AnalysisResult;
}

export function SectionBreakdown({ result }: SectionBreakdownProps) {
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-indigo-400" />
          Section & Content Dimension Breakdown
        </h3>
        <p className="text-xs text-slate-400">
          In-depth evaluation across core hiring dimensions
        </p>
      </div>

      {/* Progress Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.sectionScores.map((sec, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">{sec.name}</span>
              <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md">
                {sec.score}/100
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(sec.score)} transition-all duration-700 rounded-full`}
                style={{ width: `${sec.score}%` }}
              />
            </div>

            {/* Bullet feedback */}
            <div className="space-y-1 pt-1">
              {sec.feedback.map((fb, fidx) => (
                <div key={fidx} className="flex items-start gap-1.5 text-xs text-slate-400">
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{fb}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ATS Essential Sections Checklist */}
      <div className="pt-2 border-t border-slate-800">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
          ATS Section Header Scan
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {STANDARD_ATS_SECTIONS.map((sec) => {
            const isFound = result.metrics.sectionsFound.includes(sec.name);
            return (
              <div
                key={sec.name}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                  isFound
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                    : 'bg-rose-500/5 border-rose-500/20 text-slate-400'
                }`}
              >
                <span className="truncate mr-2">{sec.name}</span>
                {isFound ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
