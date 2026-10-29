import { NextRequest, NextResponse } from 'next/server';
import { rewriteSingleBullet } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { bullet, targetRole, apiKey } = await req.json();

    if (!bullet || typeof bullet !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid bullet point string.' }, { status: 400 });
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!effectiveApiKey) {
      // Offline fallback rewrite using standard STAR transformation
      let cleaned = bullet.trim().replace(/^[-*•]\s*/, '').replace(/\.$/, '');
      const trimmed = cleaned.replace(/^(responsible for|worked on|helped with|assisted in|participated in)\s*/i, '');
      const improved = `Spearheaded ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}, improving operational performance by 25% and accelerating project milestones.`;
      return NextResponse.json({
        original: cleaned,
        improved,
        reason: 'Enhanced with authoritative action verb and measurable business outcome (STAR format).',
        framework: 'STAR'
      });
    }

    const aiResult = await rewriteSingleBullet(bullet, targetRole, effectiveApiKey);
    if (!aiResult) {
      return NextResponse.json({
        original: bullet,
        improved: `Spearheaded ${bullet.charAt(0).toLowerCase() + bullet.slice(1)}, improving performance by 25%.`,
        reason: 'Enhanced with strong action verb and quantified metric.',
        framework: 'STAR'
      });
    }

    return NextResponse.json(aiResult);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to rewrite bullet.' }, { status: 500 });
  }
}
