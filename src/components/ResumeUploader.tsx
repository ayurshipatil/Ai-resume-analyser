'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, Sparkles, FileCode, Layers } from 'lucide-react';
import { SAMPLE_PROFILES, SampleProfile } from '@/lib/sampleResumes';

interface ResumeUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  rawText: string;
  onRawTextChange: (text: string) => void;
  onSelectSample: (sample: SampleProfile) => void;
}

export function ResumeUploader({
  file,
  onFileSelect,
  rawText,
  onRawTextChange,
  onSelectSample,
}: ResumeUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const ext = droppedFile.name.split('.').pop()?.toLowerCase();
      if (['pdf', 'docx', 'txt', 'md'].includes(ext || '')) {
        onFileSelect(droppedFile);
      } else {
        alert('Please upload a PDF, DOCX, or TXT file.');
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            1. Provide Your Resume
          </h2>
          <p className="text-xs text-slate-400">Upload your PDF or DOCX resume, or paste plain text</p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload Document
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'paste'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Quick Test Samples */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Test with Preloaded Demo Profiles:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROFILES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                onSelectSample(sample);
                setActiveTab('paste');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
            >
              <span className="h-2 w-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
              <span>{sample.role}</span>
              <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                {sample.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Box or Text Area */}
      {activeTab === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileInputChange}
            className="hidden"
            id="resume-file-input"
          />

          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6 animate-bounce" />
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Drag and drop your resume file here
              </p>
              <p className="text-xs text-slate-400 mb-3">
                Supports PDF, DOCX, and TXT files (Max 10MB)
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors">
                Browse Files
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white truncate max-w-[240px] sm:max-w-md">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready for analysis
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            rows={10}
            value={rawText}
            onChange={(e) => onRawTextChange(e.target.value)}
            placeholder="Paste your resume content here (Summary, Work Experience, Education, Skills)..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-xs leading-relaxed"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>
              {rawText ? `${rawText.split(/\s+/).filter(Boolean).length} words • ${rawText.length} characters` : 'No text entered yet'}
            </span>
            {rawText && (
              <button
                type="button"
                onClick={() => onRawTextChange('')}
                className="text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear text
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
