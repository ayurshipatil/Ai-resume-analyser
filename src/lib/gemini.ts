import { AnalysisResult, BulletSuggestion } from './types';

export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescription?: string,
  apiKey?: string
): Promise<Partial<AnalysisResult> | null> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }

  const prompt = `You are a world-class Executive Career Coach and Senior Technical Recruiter who specializes in optimizing resumes for modern Applicant Tracking Systems (ATS) and hiring managers.

Analyze the following resume${jobDescription ? ' against the provided Target Job Description' : ''}.

=== RESUME TEXT ===
${resumeText.slice(0, 7000)}

${jobDescription ? `=== TARGET JOB DESCRIPTION ===\n${jobDescription.slice(0, 3000)}` : ''}

Respond with a strictly valid JSON object (no markdown, no backticks, no explanations outside JSON) with this exact schema:
{
  "summary": "2-3 sentence executive evaluation summarizing candidate caliber and ATS positioning",
  "tailoredSummaryRecommendation": "An optimized 3-4 sentence professional summary tailored for this candidate and target role",
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "bulletSuggestions": [
    {
      "original": "an exact bullet point from their resume that could be much stronger",
      "improved": "the rewritten bullet point using the STAR method with active verbs, context, and quantifiable results",
      "reason": "why this rewrite makes the candidate stand out",
      "framework": "STAR"
    }
  ],
  "additionalMissingKeywords": [
    {
      "keyword": "string",
      "category": "hard-skill",
      "importance": "high"
    }
  ],
  "atsScoreAdjustment": 0,
  "jobMatchScoreAdjustment": 0
}
Ensure there are at least 3 high-impact bulletSuggestions.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API returned error response:', response.status, errText);
      return null;
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return null;
    }

    const cleanJson = candidateText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      summary: parsed.summary,
      tailoredSummaryRecommendation: parsed.tailoredSummaryRecommendation,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : undefined,
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : undefined,
      bulletSuggestions: Array.isArray(parsed.bulletSuggestions) ? parsed.bulletSuggestions : undefined,
      aiEnhanced: true,
    };
  } catch (error) {
    console.error('Failed to run Gemini analysis:', error);
    return null;
  }
}

export async function rewriteSingleBullet(
  bullet: string,
  targetRole?: string,
  apiKey?: string
): Promise<BulletSuggestion | null> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) return null;

  const prompt = `Rewrite this resume bullet point into a high-impact, metrics-driven STAR statement for a ${targetRole || 'professional'} role:
"${bullet}"

Respond ONLY with valid JSON:
{
  "original": "${bullet}",
  "improved": "rewritten statement",
  "reason": "explanation of improvement",
  "framework": "STAR"
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (e) {
    console.error('Error rewriting bullet:', e);
    return null;
  }
}
