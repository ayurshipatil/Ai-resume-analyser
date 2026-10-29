import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResumeAI — AI Resume Analyzer & ATS Score Optimizer',
  description: 'Supercharge your job search with AI-powered resume analysis, ATS compatibility scoring, keyword matching, and STAR-method bullet rewrites.',
  keywords: ['resume analyzer', 'ATS checker', 'AI resume scanner', 'job match score', 'resume optimizer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
