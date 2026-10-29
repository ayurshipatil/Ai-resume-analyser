'use client';

import React from 'react';
import { Target, Briefcase, X, Sparkles } from 'lucide-react';

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (text: string) => void;
  targetRole: string;
  onTargetRoleChange: (role: string) => void;
}

export function JobDescriptionInput({
  jobDescription,
  onJobDescriptionChange,
  targetRole,
  onTargetRoleChange,
}: JobDescriptionInputProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            2. Target Job Description (Optional)
          </h2>
          <p className="text-xs text-slate-400">
            Paste the job posting to calculate exact ATS keyword match and tailor suggestions
          </p>
        </div>

        {jobDescription && (
          <button
            type="button"
            onClick={() => onJobDescriptionChange('')}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Target Job Title / Role
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Senior Full-Stack Engineer, Product Manager..."
              value={targetRole}
              onChange={(e) => onTargetRoleChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Job Posting Description & Requirements
          </label>
          <textarea
            rows={7}
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Paste job requirements, required technologies, qualifications, responsibilities..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-xs leading-relaxed"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
            <span>
              {jobDescription
                ? `${jobDescription.split(/\s+/).filter(Boolean).length} words • Keyword match enabled`
                : 'Leave blank for a general ATS structure audit'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
