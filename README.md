# ResumeAI — AI Resume Analyzer & ATS Score Optimizer

A modern, full-stack, production-ready web application designed to scan resumes against Applicant Tracking Systems (ATS), pinpoint missing keywords, calculate Job Description match percentages, and provide STAR-framework bullet point rewrites.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)



# AI Resume Analyser

An AI-powered tool that analyses resumes and provides useful feedback.

## 🚀 Live Demo

**Try the application here:** [AI Resume Analyser](https://ai-resume-analyser-amber-five.vercel.app/)



---

## ✨ Features

- **Multi-Format Document Parsing**: Upload `.pdf`, `.docx`, and `.txt` files or paste text directly.
- **Dual-Engine Architecture**:
  - **Built-in ATS Heuristics**: Immediate analysis out-of-the-box (zero API keys required). Evaluates action verbs, metrics, contact info, structure, and buzzwords.
  - **Google Gemini 2.5 Flash**: Qualitative coaching, custom STAR bullet point rewrites, and tailored executive summary drafting.
- **Interactive Job Description Matching**: Identifies missing hard skills, tools, and soft skills with relevance weights.
- **One-Click Preloaded Demos**: Test immediately with preloaded profiles for *Senior Full-Stack Engineer*, *Lead Product Manager*, and *AI / Data Scientist*.
- **Live Bullet Polisher**: Upgrade any weak bullet into a metric-driven STAR accomplishment with one click.
- **Export & Print**: Clean, printable PDF report view and raw JSON export.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (tested on Node 20/24)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env.local
```
Add your free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) to `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: Users can also input their key directly into the web UI via the "Set Gemini Key" modal).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 📁 Project Architecture

```
ai-resume-analyzer/
├── Dockerfile                   # Production multi-stage Docker build
├── vercel.json                  # Vercel deployment configuration
├── package.json                 # Next.js, React, Tailwind, and parsing deps
├── tsconfig.json                # TypeScript configuration
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/route.ts # Resume parsing and ATS/AI scoring endpoint
│   │   │   └── rewrite/route.ts # AI bullet point STAR rewriter endpoint
│   │   ├── globals.css          # Tailwind CSS styles & print styles
│   │   ├── layout.tsx           # Application layout & metadata
│   │   └── page.tsx             # Interactive dashboard and analyzer UI
│   ├── components/
│   │   ├── Header.tsx           # Branding & engine status indicator
│   │   ├── ApiKeyModal.tsx      # Gemini API key configuration
│   │   ├── ResumeUploader.tsx   # File drag & drop + demo presets
│   │   ├── JobDescriptionInput.tsx # Target job posting input
│   │   ├── ScoreOverview.tsx    # Radial SVG score gauges & metrics
│   │   ├── KeywordMatchCard.tsx # Matched vs missing keyword pills
│   │   ├── SectionBreakdown.tsx # ATS section checklist & dimension bars
│   │   ├── ActionableSuggestions.tsx # STAR rewrites, red flags, & bullet polisher
│   │   └── ExportReport.tsx     # PDF report print & JSON export
│   └── lib/
│       ├── types.ts             # Data models and interfaces
│       ├── atsRules.ts          # Action verbs, buzzwords, & ATS sections
│       ├── parsers.ts           # PDF, DOCX, & TXT text extraction
│       ├── analyzer.ts          # ATS scoring & keyword matching engine
│       ├── gemini.ts            # Google Gemini AI client
│       └── sampleResumes.ts     # Preloaded profiles (SWE, PM, Data Scientist)
```

---

## 🔒 Privacy & Security

- Uploaded files are processed strictly in-memory during request execution and are never saved to disk or persistent databases.
- When an API key is entered in the UI, it is stored only in the user's browser `localStorage`.
