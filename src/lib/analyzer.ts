import {
  STRONG_ACTION_VERBS,
  WEAK_PASSIVE_PHRASES,
  BUZZWORDS_AND_CLICHES,
  STANDARD_ATS_SECTIONS,
  COMMON_SKILLS_DICTIONARY,
  CONTACT_PATTERNS,
  METRIC_PATTERN
} from './atsRules';
import { AnalysisResult, BulletSuggestion, KeywordMatch, RedFlag, SectionScore } from './types';

export function analyzeResumeHeuristically(
  resumeText: string,
  jobDescription?: string
): AnalysisResult {
  const textLower = resumeText.toLowerCase();
  const words = resumeText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const estimatedReadTimeMinutes = Math.max(1, Math.round((wordCount / 220) * 10) / 10);

  // 1. Contact Information Extraction
  const emails = resumeText.match(CONTACT_PATTERNS.email) || [];
  const phones = resumeText.match(CONTACT_PATTERNS.phone) || [];
  const linkedins = resumeText.match(CONTACT_PATTERNS.linkedin) || [];
  const githubs = resumeText.match(CONTACT_PATTERNS.github) || [];

  // 2. Section Header Detection
  const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean);
  const sectionsFound: string[] = [];
  const missingSections: string[] = [];

  for (const section of STANDARD_ATS_SECTIONS) {
    const isFound = section.aliases.some(alias => {
      return lines.some(line => {
        const lineLower = line.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        return lineLower === alias || lineLower.startsWith(alias + ' ') || lineLower.endsWith(' ' + alias);
      });
    });

    if (isFound) {
      sectionsFound.push(section.name);
    } else if (section.required) {
      missingSections.push(section.name);
    }
  }

  // 3. Bullet Point & Metrics Analysis
  const bulletLines = lines.filter(line => /^[-*•\u2022\u25E6\u2043\u2219]\s+|\d+\.\s+/.test(line));
  const bulletPointCount = bulletLines.length;

  let quantifiedMetricsCount = 0;
  const metricMatches = resumeText.match(METRIC_PATTERN);
  if (metricMatches) {
    quantifiedMetricsCount = metricMatches.length;
  }

  // 4. Action Verbs & Passive Voice
  let actionVerbCount = 0;
  const matchedVerbs = new Set<string>();

  for (const verb of STRONG_ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    const matches = resumeText.match(regex);
    if (matches) {
      actionVerbCount += matches.length;
      matchedVerbs.add(verb);
    }
  }

  // 5. Red Flags Detection
  const redFlags: RedFlag[] = [];

  // Check weak/passive phrases
  for (const phrase of WEAK_PASSIVE_PHRASES) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    if (regex.test(resumeText)) {
      redFlags.push({
        type: 'passive-voice',
        severity: 'medium',
        title: `Passive Phrase: "${phrase}"`,
        description: `Replace passive phrases like "${phrase}" with strong action verbs (e.g., spearheaded, architected, delivered).`,
      });
    }
  }

  // Check buzzwords
  for (const item of BUZZWORDS_AND_CLICHES) {
    const regex = new RegExp(`\\b${item.word}\\b`, 'gi');
    if (regex.test(resumeText)) {
      redFlags.push({
        type: 'buzzword',
        severity: 'low',
        title: `Cliché Detected: "${item.word}"`,
        description: item.reason,
      });
    }
  }

  // Check formatting & length
  if (wordCount < 250) {
    redFlags.push({
      type: 'length',
      severity: 'high',
      title: 'Resume is Too Short',
      description: `Your resume contains only ${wordCount} words. Standard resumes should be between 400 and 900 words.`,
    });
  } else if (wordCount > 1400) {
    redFlags.push({
      type: 'length',
      severity: 'medium',
      title: 'Resume is Overly Lengthy',
      description: `Your resume has ${wordCount} words. Recruiter scan times are under 10 seconds; consider keeping it to 1-2 concise pages (450-800 words per page).`,
    });
  }

  if (emails.length === 0) {
    redFlags.push({
      type: 'missing-info',
      severity: 'high',
      title: 'Missing Email Address',
      description: 'No valid email address was detected. ATS parsers need an email to create a candidate profile.',
    });
  }

  if (phones.length === 0) {
    redFlags.push({
      type: 'missing-info',
      severity: 'medium',
      title: 'Missing Phone Number',
      description: 'No clear phone number was detected on your resume.',
    });
  }

  if (missingSections.length > 0) {
    redFlags.push({
      type: 'formatting',
      severity: 'high',
      title: `Missing Essential Sections: ${missingSections.join(', ')}`,
      description: 'ATS systems look for standard headings like Experience, Skills, and Education to index your career history correctly.',
    });
  }

  // 6. Keywords & Skills Analysis
  const matchedKeywords: KeywordMatch[] = [];
  const missingKeywords: KeywordMatch[] = [];

  // Collect skills mentioned in the resume
  for (const [skill, meta] of Object.entries(COMMON_SKILLS_DICTIONARY)) {
    const skillVariants = [skill, ...(meta.variations || [])];
    const isPresent = skillVariants.some(variant => {
      const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9#+.])${escaped}([^a-zA-Z0-9#+.]|$)`, 'i');
      return regex.test(resumeText);
    });

    if (isPresent) {
      matchedKeywords.push({
        keyword: skill,
        category: meta.category,
        foundInResume: true,
        frequency: 1,
        importance: 'medium',
      });
    }
  }

  // Match against Job Description if provided
  let jobMatchScore = 70; // baseline if no JD
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdLower = jobDescription.toLowerCase();
    const jdSkills: { skill: string; meta: (typeof COMMON_SKILLS_DICTIONARY)[string] }[] = [];

    for (const [skill, meta] of Object.entries(COMMON_SKILLS_DICTIONARY)) {
      const skillVariants = [skill, ...(meta.variations || [])];
      const isInJD = skillVariants.some(variant => {
        const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|[^a-zA-Z0-9#+.])${escaped}([^a-zA-Z0-9#+.]|$)`, 'i');
        return regex.test(jobDescription);
      });

      if (isInJD) {
        jdSkills.push({ skill, meta });
      }
    }

    if (jdSkills.length > 0) {
      let matchedCount = 0;
      for (const item of jdSkills) {
        const found = matchedKeywords.some(m => m.keyword === item.skill);
        if (found) {
          matchedCount++;
        } else {
          missingKeywords.push({
            keyword: item.skill,
            category: item.meta.category,
            foundInResume: false,
            frequency: 0,
            importance: item.meta.category === 'hard-skill' ? 'high' : 'medium',
          });
        }
      }
      jobMatchScore = Math.min(100, Math.round((matchedCount / jdSkills.length) * 100));
    }
  }

  // 7. Section Scoring
  const sectionScores: SectionScore[] = [];

  // ATS Formatting & Completeness
  let formattingScore = 90;
  if (missingSections.length > 0) formattingScore -= missingSections.length * 20;
  if (emails.length === 0) formattingScore -= 15;
  if (phones.length === 0) formattingScore -= 10;
  formattingScore = Math.max(30, Math.min(100, formattingScore));

  sectionScores.push({
    name: 'ATS Formatting & Structure',
    score: formattingScore,
    weight: 25,
    status: formattingScore >= 80 ? 'excellent' : formattingScore >= 65 ? 'good' : 'needs-work',
    feedback: [
      missingSections.length === 0 ? 'All key ATS sections detected.' : `Missing sections: ${missingSections.join(', ')}`,
      emails.length > 0 ? 'Email address detected.' : 'Add your contact email clearly at the top.',
      bulletPointCount >= 5 ? `Found ${bulletPointCount} bullet points (good readability).` : 'Use more bullet points to structure your accomplishments.',
    ]
  });

  // Action Verbs & Leadership
  let verbScore = Math.min(100, Math.round((actionVerbCount / Math.max(bulletPointCount, 8)) * 85));
  verbScore = Math.max(35, Math.min(100, verbScore));

  sectionScores.push({
    name: 'Action Verbs & Phrasing',
    score: verbScore,
    weight: 25,
    status: verbScore >= 80 ? 'excellent' : verbScore >= 60 ? 'good' : 'needs-work',
    feedback: [
      `Detected ${actionVerbCount} high-impact action verbs.`,
      verbScore >= 75 ? 'Strong executive action-oriented language.' : 'Begin every bullet point with a vigorous action verb (e.g. Architected, Accelerated, Reduced).'
    ]
  });

  // Quantified Impact & Metrics
  let metricScore = Math.min(100, Math.round((quantifiedMetricsCount / Math.max(bulletPointCount * 0.5, 4)) * 90));
  metricScore = Math.max(30, Math.min(100, metricScore));

  sectionScores.push({
    name: 'Quantified Impact (STAR Method)',
    score: metricScore,
    weight: 25,
    status: metricScore >= 75 ? 'excellent' : metricScore >= 55 ? 'good' : 'needs-work',
    feedback: [
      `Found ${quantifiedMetricsCount} quantifiable results (percentages, revenue, scale, time savings).`,
      metricScore >= 70 ? 'Excellent inclusion of data and metrics.' : 'Back up claims with numerical evidence (e.g., "Increased conversion by 24%", "Reduced latency by 120ms").'
    ]
  });

  // Skills & Technical Alignment
  let skillScore = Math.min(100, Math.round((matchedKeywords.length / 12) * 85));
  if (jobDescription && jobDescription.trim().length > 20) {
    skillScore = jobMatchScore;
  }
  skillScore = Math.max(40, Math.min(100, skillScore));

  sectionScores.push({
    name: 'Skills & Role Alignment',
    score: skillScore,
    weight: 25,
    status: skillScore >= 80 ? 'excellent' : skillScore >= 60 ? 'good' : 'needs-work',
    feedback: [
      `Found ${matchedKeywords.length} recognized technical & professional competencies.`,
      missingKeywords.length > 0 ? `Consider adding high-priority keywords: ${missingKeywords.slice(0, 4).map(k => k.keyword).join(', ')}` : 'Strong keyword coverage.'
    ]
  });

  // Overall ATS Readiness Score
  const atsReadinessScore = Math.round(
    formattingScore * 0.35 +
    verbScore * 0.25 +
    metricScore * 0.25 +
    skillScore * 0.15
  );

  const overallScore = jobDescription && jobDescription.trim().length > 20
    ? Math.round(atsReadinessScore * 0.55 + jobMatchScore * 0.45)
    : atsReadinessScore;

  // 8. Sample Bullet Point Rewrite Suggestions
  const bulletSuggestions: BulletSuggestion[] = [];
  const candidateBullets = bulletLines.filter(b => b.length > 25 && b.length < 160).slice(0, 3);

  for (const bullet of candidateBullets) {
    let cleaned = bullet.replace(/^[-*•\u2022\u25E6\u2043\u2219]\s+|\d+\.\s+/, '').trim().replace(/\.$/, '');
    const firstWord = cleaned.split(/\s+/)[0]?.toLowerCase();
    const startsWithActionVerb = STRONG_ACTION_VERBS.includes(firstWord);

    let improved = '';
    if (startsWithActionVerb) {
      improved = `${cleaned}, driving a 28% increase in operational efficiency and saving 10+ team hours weekly.`;
    } else {
      const trimmedPhrase = cleaned.replace(/^(responsible for|worked on|helped with|assisted in|participated in)\s*/i, '');
      improved = `Spearheaded ${trimmedPhrase.charAt(0).toLowerCase() + trimmedPhrase.slice(1)}, delivering a 32% performance boost and cutting release cycle time by 2 weeks.`;
    }

    bulletSuggestions.push({
      original: cleaned,
      improved,
      reason: 'Enhanced with authoritative action phrasing and measurable business impact using the STAR framework.',
      framework: 'STAR'
    });
  }

  // 9. Strengths and Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (actionVerbCount >= 8) strengths.push(`Strong vocabulary of ${actionVerbCount} action verbs throughout experience sections.`);
  if (quantifiedMetricsCount >= 4) strengths.push(`Great use of measurable metrics (${quantifiedMetricsCount} data points identified).`);
  if (sectionsFound.includes('Skills') && matchedKeywords.length >= 8) strengths.push(`Comprehensive technical skills profile (${matchedKeywords.length} core competencies parsed).`);
  if (linkedins.length > 0 || githubs.length > 0) strengths.push('Professional portfolio/profile links included.');

  if (quantifiedMetricsCount < 3) weaknesses.push('Low frequency of measurable metrics. Add percentages, dollar amounts, or team sizes to bullets.');
  if (missingKeywords.length > 0) weaknesses.push(`Missing key role requirements from the job description (${missingKeywords.slice(0, 5).map(k => k.keyword).join(', ')}).`);
  if (missingSections.length > 0) weaknesses.push(`Missing standard ATS headings: ${missingSections.join(', ')}.`);
  if (redFlags.some(r => r.type === 'buzzword')) weaknesses.push('Contains generic buzzwords/clichés that weaken professional authority.');

  return {
    overallScore,
    atsReadinessScore,
    jobMatchScore,
    summary: `Your resume demonstrates an ATS Readiness of ${atsReadinessScore}/100${jobDescription ? ` and a Job Match score of ${jobMatchScore}%` : ''}. ${strengths[0] || 'Standard formatting detected.'}`,
    metrics: {
      wordCount,
      estimatedReadTimeMinutes,
      actionVerbCount,
      quantifiedMetricsCount,
      bulletPointCount,
      sectionsFound,
      missingSections,
    },
    sectionScores,
    keywords: {
      matched: matchedKeywords,
      missing: missingKeywords,
      topResumeKeywords: matchedKeywords.slice(0, 10).map(k => ({ text: k.keyword, count: 1 })),
    },
    redFlags,
    bulletSuggestions,
    strengths: strengths.length ? strengths : ['Clear chronological layout.'],
    weaknesses: weaknesses.length ? weaknesses : ['Add further quantifiable metrics to demonstrate business value.'],
    aiEnhanced: false,
    analyzedAt: new Date().toISOString(),
  };
}
