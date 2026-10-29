'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { Printer, Download, Share2 } from 'lucide-react';

interface ExportReportProps {
  result: AnalysisResult;
}

export function ExportReport({ result }: ExportReportProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `resume-audit-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 no-print">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all shadow-sm"
      >
        <Printer className="w-3.5 h-3.5 text-indigo-400" />
        Print / Save Report as PDF
      </button>

      <button
        onClick={handleDownloadJson}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all shadow-sm"
      >
        <Download className="w-3.5 h-3.5 text-purple-400" />
        Export Audit JSON
      </button>
    </div>
  );
}
