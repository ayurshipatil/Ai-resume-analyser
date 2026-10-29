'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { ResumeUploader } from '@/components/ResumeUploader';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { ScoreOverview } from '@/components/ScoreOverview';
import { KeywordMatchCard } from '@/components/KeywordMatchCard';
import { SectionBreakdown } from '@/components/SectionBreakdown';
import { ActionableSuggestions } from '@/components/ActionableSuggestions';
import { ExportReport } from '@/components/ExportReport';
import { SampleProfile } from '@/lib/sampleResumes';
import { AnalysisResult } from '@/lib/types';
import { Sparkles, ArrowRight, RotateCw, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load API key and theme from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      if (savedKey) setApiKey(savedKey);

      const savedTheme = localStorage.getItem('resumeai_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add('light');
      }
    } catch (e) {
      // LocalStorage access might fail in private windows
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('resumeai_theme', nextTheme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(nextTheme);
    } catch (e) {}
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      if (key) {
        localStorage.setItem('gemini_api_key', key);
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    } catch (e) {}
  };

  const handleSelectSample = (sample: SampleProfile) => {
    setFile(null);
    setRawText(sample.resumeText);
    setJobDescription(sample.sampleJobDescription);
    setTargetRole(sample.role);
    setErrorMsg(null);
  };

  const handleAnalyze = async () => {
    if (!file && !rawText.trim()) {
      setErrorMsg('Please upload a resume file or paste your resume text to begin.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      let res: Response;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        if (jobDescription) formData.append('jobDescription', jobDescription);
        if (apiKey) formData.append('apiKey', apiKey);
        if (targetRole) formData.append('targetRole', targetRole);

        res = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText: rawText,
            jobDescription,
            apiKey,
            targetRole,
          }),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to analyze resume.');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);

      // Trigger confetti celebration if overall score is great!
      if (data.overallScore >= 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      // Smooth scroll down to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen ATS Score Scanner & AI Career Optimizer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Land More Interviews with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              AI-Powered Resume Analysis
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Scan your resume against strict Applicant Tracking System algorithms. Uncover missing
            keywords, audit action verbs, and rewrite weak bullet points with measurable STAR impacts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Heuristics Engine
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> PDF & DOCX Parsing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> STAR Bullet Upgrades
            </span>
          </div>
        </div>

        {/* Input Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUploader
            file={file}
            onFileSelect={setFile}
            rawText={rawText}
            onRawTextChange={setRawText}
            onSelectSample={handleSelectSample}
          />

          <JobDescriptionInput
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            targetRole={targetRole}
            onTargetRoleChange={setTargetRole}
          />
        </div>

        {/* Action Button & Error State */}
        <div className="text-center space-y-3 pt-2">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs max-w-md mx-auto flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isLoading ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                <span>Auditing Resume & ATS Algorithms...</span>
              </>
            ) : (
              <>
                <span>Analyze Resume & Calculate Match</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Results View */}
        {result && (
          <div id="results-section" className="space-y-8 pt-8 border-t border-slate-800/80 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Audit Report & Optimization Plan
                </h2>
                <p className="text-xs text-slate-400">
                  Generated {new Date(result.analyzedAt).toLocaleDateString()} at{' '}
                  {new Date(result.analyzedAt).toLocaleTimeString()}
                </p>
              </div>

              <ExportReport result={result} />
            </div>

            <ScoreOverview result={result} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <KeywordMatchCard result={result} />
              <SectionBreakdown result={result} />
            </div>

            <ActionableSuggestions
              result={result}
              apiKey={apiKey}
              targetRole={targetRole}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 bg-slate-950/60 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs text-slate-400 font-medium">
            AI Resume Analyzer & ATS Optimizer • Built for seamless deployment to Vercel, Netlify & Docker
          </p>
          <p className="text-[11px] text-slate-400">
            Privacy Guaranteed: Documents are parsed in-memory and never permanently stored.
          </p>
        </div>
      </footer>
    </div>
  );
}
