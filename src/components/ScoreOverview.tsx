'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { Sparkles, Clock, FileText, Zap, Award, CheckCircle, AlertTriangle } from 'lucide-react';

interface ScoreOverviewProps {
  result: AnalysisResult;
}

function ScoreCircle({
  score,
  label,
  sublabel,
  colorClass,
  ringColor,
}: {
  score: number;
  label: string;
  sublabel: string;
  colorClass: string;
  ringColor: string;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            className={`${ringColor} transition-all duration-1000 ease-out`}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold ${colorClass}`}>{score}</span>
          <span className="text-[10px] uppercase font-semibold text-slate-400">/ 100</span>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-white mt-3">{label}</h3>
      <p className="text-xs text-slate-400">{sublabel}</p>
    </div>
  );
}

export function ScoreOverview({ result }: ScoreOverviewProps) {
  const getScoreColor = (val: number) => {
    if (val >= 80) return { text: 'text-emerald-400', ring: 'text-emerald-500' };
    if (val >= 60) return { text: 'text-amber-400', ring: 'text-amber-500' };
    return { text: 'text-rose-400', ring: 'text-rose-500' };
  };

  const overallColors = getScoreColor(result.overallScore);
  const atsColors = getScoreColor(result.atsReadinessScore);
  const matchColors = getScoreColor(result.jobMatchScore);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header with summary & AI indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Resume Performance Audit</h2>
            {result.aiEnhanced ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Gemini AI Analyzed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <Award className="w-3 h-3 text-indigo-400" />
                ATS Engine Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Score Rings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ScoreCircle
          score={result.overallScore}
          label="Overall Score"
          sublabel={result.overallScore >= 80 ? 'Interview Ready' : result.overallScore >= 60 ? 'Competitive' : 'Requires Tuning'}
          colorClass={overallColors.text}
          ringColor={overallColors.ring}
        />
        <ScoreCircle
          score={result.atsReadinessScore}
          label="ATS Compatibility"
          sublabel="Parsing & Section Layout"
          colorClass={atsColors.text}
          ringColor={atsColors.ring}
        />
        <ScoreCircle
          score={result.jobMatchScore}
          label="Job Match Fit"
          sublabel="Skills & Experience Alignment"
          colorClass={matchColors.text}
          ringColor={matchColors.ring}
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Word Count</p>
            <p className="text-sm font-bold text-white">{result.metrics.wordCount}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Recruiter Scan Time</p>
            <p className="text-sm font-bold text-white">{result.metrics.estimatedReadTimeMinutes} min</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Action Verbs</p>
            <p className="text-sm font-bold text-white">{result.metrics.actionVerbCount}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Quantified Metrics</p>
            <p className="text-sm font-bold text-white">{result.metrics.quantifiedMetricsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
