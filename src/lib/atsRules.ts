export const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advised', 'analyzed', 'architected',
  'automated', 'built', 'championed', 'coached', 'collaborated', 'conceptualized',
  'consolidated', 'constructed', 'coordinated', 'created', 'customized', 'decreased',
  'delegated', 'delivered', 'deployed', 'designed', 'developed', 'devised',
  'directed', 'doubled', 'drafted', 'drove', 'eliminated', 'engineered',
  'established', 'evaluated', 'exceeded', 'executed', 'expanded', 'expedited',
  'facilitated', 'formulated', 'fostered', 'founded', 'generated', 'governed',
  'guided', 'headed', 'identified', 'implemented', 'improved', 'increased',
  'initiated', 'innovated', 'inspected', 'instituted', 'integrated', 'invented',
  'investigated', 'launched', 'led', 'leveraged', 'managed', 'maximized',
  'mentored', 'minimized', 'modernized', 'monitored', 'motivated', 'negotiated',
  'optimized', 'orchestrated', 'organized', 'originated', 'outperformed', 'overhauled',
  'oversaw', 'partnered', 'pioneered', 'planned', 'produced', 'programmed',
  'promoted', 'published', 'rebuilt', 'recruited', 'redesigned', 'reduced',
  'reengineered', 'refined', 'regulated', 'remodeled', 'reorganized', 'replaced',
  'restructured', 'revitalized', 'revolutionized', 'saved', 'scaled', 'secured',
  'simplified', 'spearheaded', 'standardized', 'streamlined', 'strengthened', 'surpassed',
  'synthesized', 'targeted', 'trained', 'transformed', 'upgraded', 'validated',
  'won', 'yielded'
];

export const WEAK_PASSIVE_PHRASES = [
  'responsible for', 'duties included', 'worked on', 'helped with', 'assisted in',
  'participated in', 'tasked with', 'handled day to day', 'part of a team that',
  'served as', 'involved with', 'attempted to', 'was responsible for'
];

export const BUZZWORDS_AND_CLICHES = [
  { word: 'rockstar', reason: 'Informal slang; replace with concrete accomplishments and domain expertise.' },
  { word: 'ninja', reason: 'Vague buzzword; state your exact technical specialization.' },
  { word: 'guru', reason: 'Overused cliché; demonstrate your expertise through measurable results.' },
  { word: 'synergy', reason: 'Corporate jargon; describe specifically how teams or systems interacted.' },
  { word: 'hard worker', reason: 'Generic filler; every candidate claims this. Show productivity with output metrics.' },
  { word: 'think outside the box', reason: 'Trite phrase; explain the creative or innovative solution you introduced.' },
  { word: 'go-getter', reason: 'Unprofessional cliché; show initiative with projects you founded or spearheaded.' },
  { word: 'team player', reason: 'Overused cliché; specify cross-functional collaborations and team size.' },
  { word: 'detail-oriented', reason: 'Show, don\'t tell; immaculate formatting and error-free code prove attention to detail.' },
  { word: 'results-driven', reason: 'Empty claim without data; provide dollar, percentage, or efficiency metrics instead.' }
];

export const STANDARD_ATS_SECTIONS = [
  {
    name: 'Contact Information',
    aliases: ['contact', 'personal info', 'contact details', 'address', 'get in touch'],
    required: true,
    weight: 15
  },
  {
    name: 'Professional Summary',
    aliases: ['summary', 'professional summary', 'executive summary', 'profile', 'about me', 'career objective'],
    required: true,
    weight: 15
  },
  {
    name: 'Work Experience',
    aliases: ['experience', 'work experience', 'employment history', 'professional experience', 'work history'],
    required: true,
    weight: 35
  },
  {
    name: 'Skills',
    aliases: ['skills', 'technical skills', 'core competencies', 'technologies', 'proficiencies', 'key skills'],
    required: true,
    weight: 20
  },
  {
    name: 'Education',
    aliases: ['education', 'academic background', 'qualifications', 'degrees', 'education and training'],
    required: true,
    weight: 10
  },
  {
    name: 'Projects / Certifications',
    aliases: ['projects', 'personal projects', 'certifications', 'licenses', 'achievements', 'awards'],
    required: false,
    weight: 5
  }
];

export const COMMON_SKILLS_DICTIONARY: Record<string, { category: 'hard-skill' | 'soft-skill' | 'tool' | 'certification'; variations?: string[] }> = {
  // Programming Languages
  'python': { category: 'hard-skill' },
  'javascript': { category: 'hard-skill', variations: ['js', 'ecmascript'] },
  'typescript': { category: 'hard-skill', variations: ['ts'] },
  'java': { category: 'hard-skill' },
  'c++': { category: 'hard-skill', variations: ['cpp'] },
  'c#': { category: 'hard-skill', variations: ['csharp', '.net'] },
  'golang': { category: 'hard-skill', variations: ['go'] },
  'rust': { category: 'hard-skill' },
  'ruby': { category: 'hard-skill' },
  'php': { category: 'hard-skill' },
  'swift': { category: 'hard-skill' },
  'kotlin': { category: 'hard-skill' },
  'sql': { category: 'hard-skill' },
  'html': { category: 'hard-skill', variations: ['html5'] },
  'css': { category: 'hard-skill', variations: ['css3'] },

  // Frameworks & Libraries
  'react': { category: 'hard-skill', variations: ['reactjs', 'react.js'] },
  'next.js': { category: 'hard-skill', variations: ['nextjs', 'next'] },
  'vue': { category: 'hard-skill', variations: ['vuejs', 'vue.js'] },
  'angular': { category: 'hard-skill' },
  'node.js': { category: 'hard-skill', variations: ['nodejs', 'node'] },
  'express': { category: 'hard-skill', variations: ['express.js', 'expressjs'] },
  'django': { category: 'hard-skill' },
  'fastapi': { category: 'hard-skill' },
  'flask': { category: 'hard-skill' },
  'spring boot': { category: 'hard-skill', variations: ['spring'] },
  'tailwind css': { category: 'hard-skill', variations: ['tailwind', 'tailwindcss'] },

  // Cloud & DevOps
  'aws': { category: 'tool', variations: ['amazon web services'] },
  'azure': { category: 'tool', variations: ['microsoft azure'] },
  'gcp': { category: 'tool', variations: ['google cloud', 'google cloud platform'] },
  'docker': { category: 'tool' },
  'kubernetes': { category: 'tool', variations: ['k8s'] },
  'terraform': { category: 'tool' },
  'ci/cd': { category: 'hard-skill', variations: ['cicd', 'continuous integration', 'github actions', 'jenkins', 'gitlab ci'] },
  'git': { category: 'tool', variations: ['github', 'gitlab'] },
  'linux': { category: 'hard-skill' },

  // Databases
  'postgresql': { category: 'tool', variations: ['postgres'] },
  'mysql': { category: 'tool' },
  'mongodb': { category: 'tool', variations: ['mongo'] },
  'redis': { category: 'tool' },
  'elasticsearch': { category: 'tool' },
  'dynamodb': { category: 'tool' },

  // AI & Data
  'machine learning': { category: 'hard-skill', variations: ['ml'] },
  'deep learning': { category: 'hard-skill', variations: ['dl'] },
  'nlp': { category: 'hard-skill', variations: ['natural language processing'] },
  'computer vision': { category: 'hard-skill' },
  'pytorch': { category: 'tool' },
  'tensorflow': { category: 'tool' },
  'scikit-learn': { category: 'tool', variations: ['sklearn'] },
  'pandas': { category: 'tool' },
  'numpy': { category: 'tool' },
  'genai': { category: 'hard-skill', variations: ['generative ai', 'llm', 'large language models'] },

  // Product & Agile
  'agile': { category: 'hard-skill', variations: ['scrum', 'kanban'] },
  'jira': { category: 'tool' },
  'figma': { category: 'tool' },
  'product management': { category: 'hard-skill' },
  'user research': { category: 'hard-skill' },
  'a/b testing': { category: 'hard-skill', variations: ['ab testing', 'experimentation'] },
  'kpis': { category: 'hard-skill', variations: ['okrs', 'metrics'] },

  // Soft Skills
  'leadership': { category: 'soft-skill' },
  'communication': { category: 'soft-skill' },
  'problem solving': { category: 'soft-skill' },
  'stakeholder management': { category: 'soft-skill' },
  'collaboration': { category: 'soft-skill' },
  'critical thinking': { category: 'soft-skill' },
  'project management': { category: 'soft-skill' },
  'mentorship': { category: 'soft-skill' },

  // Certifications
  'aws certified': { category: 'certification' },
  'pmp': { category: 'certification', variations: ['project management professional'] },
  'cissp': { category: 'certification' },
  'scrum master': { category: 'certification', variations: ['csm'] }
};

export const CONTACT_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
  phone: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/gi,
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|pub)\/([a-zA-Z0-9_-]+)/gi,
  github: /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/gi
};

export const METRIC_PATTERN = /\b(?:\$\d+(?:,\d+)*(?:\.\d+)?(?:k|m|b|million|billion)?|\d+(?:\.\d+)?%|\b\d+(?:,\d+)*(?:\+)?\s*(?:users|clients|customers|leads|requests|rps|qps|ms|seconds|minutes|hours|days|weeks|months|years|members|engineers|teams|projects))\b/gi;
