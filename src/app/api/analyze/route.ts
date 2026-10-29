import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile, cleanExtractedText } from '@/lib/parsers';
import { analyzeResumeHeuristically } from '@/lib/analyzer';
import { analyzeResumeWithGemini } from '@/lib/gemini';
import { AnalysisResult } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let resumeText = '';
    let jobDescription = '';
    let apiKey = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      jobDescription = (formData.get('jobDescription') as string) || '';
      apiKey = (formData.get('apiKey') as string) || '';
      const rawText = (formData.get('resumeText') as string) || '';

      if (file && file.size > 0) {
        resumeText = await extractTextFromFile(file);
      } else if (rawText) {
        resumeText = rawText;
      }
    } else {
      const json = await req.json();
      resumeText = json.resumeText || '';
      jobDescription = json.jobDescription || '';
      apiKey = json.apiKey || '';
    }

    resumeText = cleanExtractedText(resumeText);

    if (!resumeText || resumeText.length < 50) {
      return NextResponse.json(
        { error: 'Please provide a valid resume with at least 50 characters of text.' },
        { status: 400 }
      );
    }

    // Step 1: Run comprehensive ATS & keyword heuristic analysis
    const heuristicResult: AnalysisResult = analyzeResumeHeuristically(resumeText, jobDescription);

    // Step 2: If Gemini API key is available, enrich with deep AI insights
    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;
    if (effectiveApiKey) {
      try {
        const aiInsights = await analyzeResumeWithGemini(resumeText, jobDescription, effectiveApiKey);
        if (aiInsights) {
          if (aiInsights.summary) heuristicResult.summary = aiInsights.summary;
          if (aiInsights.tailoredSummaryRecommendation) {
            heuristicResult.tailoredSummaryRecommendation = aiInsights.tailoredSummaryRecommendation;
          }
          if (aiInsights.strengths && aiInsights.strengths.length > 0) {
            heuristicResult.strengths = aiInsights.strengths;
          }
          if (aiInsights.weaknesses && aiInsights.weaknesses.length > 0) {
            heuristicResult.weaknesses = aiInsights.weaknesses;
          }
          if (aiInsights.bulletSuggestions && aiInsights.bulletSuggestions.length > 0) {
            heuristicResult.bulletSuggestions = aiInsights.bulletSuggestions;
          }
          heuristicResult.aiEnhanced = true;
        }
      } catch (err) {
        console.warn('Gemini enhancement skipped due to error:', err);
      }
    }

    return NextResponse.json(heuristicResult);
  } catch (error: any) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: error?.message || 'An error occurred during resume analysis.' },
      { status: 500 }
    );
  }
}
