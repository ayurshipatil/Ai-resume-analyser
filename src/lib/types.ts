export interface KeywordMatch {
  keyword: string;
  category: 'hard-skill' | 'soft-skill' | 'tool' | 'certification' | 'general';
  foundInResume: boolean;
  frequency: number;
  importance: 'high' | 'medium' | 'low';
}

export interface BulletSuggestion {
  original: string;
  improved: string;
  reason: string;
  framework: 'STAR' | 'Metric-Driven' | 'Action-Oriented';
}

export interface SectionScore {
  name: string;
  score: number; // 0-100
  weight: number;
  status: 'excellent' | 'good' | 'needs-work' | 'critical';
  feedback: string[];
}

export interface RedFlag {
  type: 'buzzword' | 'formatting' | 'length' | 'passive-voice' | 'missing-info';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  lineSnippet?: string;
}

export interface AnalysisResult {
  overallScore: number; // 0 - 100
  atsReadinessScore: number; // 0 - 100
  jobMatchScore: number; // 0 - 100
  summary: string;
  metrics: {
    wordCount: number;
    estimatedReadTimeMinutes: number;
    actionVerbCount: number;
    quantifiedMetricsCount: number;
    bulletPointCount: number;
    sectionsFound: string[];
    missingSections: string[];
  };
  sectionScores: SectionScore[];
  keywords: {
    matched: KeywordMatch[];
    missing: KeywordMatch[];
    topResumeKeywords: { text: string; count: number }[];
  };
  redFlags: RedFlag[];
  bulletSuggestions: BulletSuggestion[];
  strengths: string[];
  weaknesses: string[];
  tailoredSummaryRecommendation?: string;
  aiEnhanced: boolean;
  analyzedAt: string;
}

export interface AnalyzeRequest {
  resumeText?: string;
  jobDescription?: string;
  apiKey?: string;
  targetRole?: string;
}
