'use client';

import React from 'react';
import { Sparkles, Key, CheckCircle2, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Header({
  onOpenApiKeyModal,
  hasCustomKey,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950/40 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">ResumeAI</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ATS Optimizer
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">AI Resume & Job Match Intelligence</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* AI Mode Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Engine:</span>
            <span className="text-slate-200 font-medium">
              {hasCustomKey ? 'Gemini 2.5 Flash' : 'Smart ATS Heuristics + AI'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              hasCustomKey
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/20'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hasCustomKey ? 'Gemini Configured' : 'Set API Key'}</span>
            <span className="sm:hidden">Key</span>
            {hasCustomKey && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 animate-in spin-in-90 duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
