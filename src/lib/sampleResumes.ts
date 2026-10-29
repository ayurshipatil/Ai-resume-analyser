export interface SampleProfile {
  id: string;
  role: string;
  badge: string;
  resumeText: string;
  sampleJobDescription: string;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'swe-senior',
    role: 'Senior Full-Stack Engineer',
    badge: 'Tech / Software',
    resumeText: `ALEX RIVERA
San Francisco, CA | (555) 019-2834 | alex.rivera@email.com | linkedin.com/in/alexrivera-dev | github.com/alexrivera

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Engineer with 6+ years of experience architecting high-throughput distributed systems and responsive web applications. Proven track record of scaling platforms to 10M+ MAU and reducing cloud infrastructure costs by 32%. Specialized in React, Next.js, Node.js, TypeScript, and AWS cloud-native architecture.

CORE COMPETENCIES & TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5, CSS3
Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Redux Toolkit
Cloud & DevOps: AWS (ECS, Lambda, S3, RDS, CloudFront), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform
Databases: PostgreSQL, MongoDB, Redis, Elasticsearch
Methodologies: Agile/Scrum, Microservices, RESTful APIs, GraphQL, TDD, System Design

WORK EXPERIENCE
Apex Digital Cloud — Senior Software Engineer
June 2022 – Present | San Francisco, CA
• Architected and deployed a multi-tenant SaaS analytics platform using Next.js, Node.js, and PostgreSQL, processing 45M+ daily events with 99.99% uptime.
• Spearheaded migration from monolithic Rails backend to event-driven microservices on AWS ECS, reducing p99 API latency from 450ms to 65ms.
• Optimized database indexing and introduced Redis caching layer, cutting AWS RDS utilization by 40% and saving $85,000 annually.
• Mentored 5 mid-level engineers, instituted weekly architecture reviews, and increased test coverage from 62% to 91% using Jest and Cypress.

Beacon Technologies — Full-Stack Software Engineer
August 2019 – May 2022 | Austin, TX
• Developed and launched customer-facing payment checkout flows supporting 12 currencies, increasing transaction completion rate by 18%.
• Built reusable design system component library in React and TypeScript adopted by 4 distinct engineering squads across the organization.
• Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle duration from 4 days to 35 minutes.
• Collaborated closely with product managers and UX designers in bi-weekly sprints to prioritize roadmap features for 2M active users.

EDUCATION
University of Texas at Austin — Bachelor of Science in Computer Science
August 2015 – May 2019 | GPA: 3.8/4.0
Honors: Dean's Honor Roll, President's Achievement Award

CERTIFICATIONS & PROJECTS
• AWS Certified Solutions Architect – Associate (2023)
• OpenSource Contributor: Contributed performance enhancements to prominent React table libraries (2.4k GitHub stars)`,
    sampleJobDescription: `Senior Full-Stack Software Engineer (Remote / Hybrid)

About the Role:
We are looking for a Senior Full-Stack Software Engineer to build and scale our next-generation cloud collaboration platform. You will design scalable web applications, collaborate with cross-functional teams, and own end-to-end features from inception to deployment.

Requirements:
• 5+ years of software engineering experience building production web applications.
• Deep proficiency in TypeScript, React, Next.js, and Node.js.
• Experience with cloud infrastructure on AWS, containerization with Docker, and Kubernetes.
• Solid background in relational databases (PostgreSQL) and distributed caching (Redis).
• Strong understanding of CI/CD pipelines, automated testing, and microservices architecture.
• Excellent communication skills, mentorship capabilities, and proactive problem-solving mindset.`
  },
  {
    id: 'pm-lead',
    role: 'Lead Product Manager',
    badge: 'Product & Strategy',
    resumeText: `JORDAN CHEN
New York, NY | (555) 432-8765 | jordan.chen@email.com | linkedin.com/in/jordanchen-pm

EXECUTIVE SUMMARY
Strategic and data-driven Lead Product Manager with 7+ years of experience leading cross-functional teams in B2B SaaS and consumer fintech. Generated $14M in net new ARR by launching zero-to-one product initiatives and optimizing user onboarding funnels. Adept in user research, A/B testing experimentation, product analytics, and executive stakeholder alignment.

CORE SKILLS & EXPERTISE
Product Strategy: Zero-to-One Product Discovery, Roadmapping, Go-to-Market (GTM), Pricing & Packaging
Analytics & Experimentation: A/B Testing, Amplitude, Mixpanel, SQL, Cohort Analysis, Conversion Rate Optimization (CRO)
Execution & Agile: Scrum, Jira, Sprint Planning, PRDs, User Story Mapping, OKRs
Tools: Figma, Tableau, Salesforce, Linear, Notion, Postman

PROFESSIONAL EXPERIENCE
Nova Fintech Solutions — Lead Product Manager, Growth & Retention
March 2021 – Present | New York, NY
• Spearheaded product strategy and execution for customer onboarding and lifecycle retention, boosting 30-day user activation from 34% to 58%.
• Led a high-performing cross-functional pod of 9 software engineers, 2 product designers, and 1 dedicated data scientist.
• Conceptualized and launched an automated investment portfolio rebalancing feature that drove $8.2M in assets under management (AUM) in first 6 months.
• Designed and evaluated 40+ rigorous A/B experiments across web and mobile surfaces, yielding a 22% increase in signup-to-paid conversion.

Stratum Enterprise SaaS — Senior Product Manager
July 2018 – February 2021 | Boston, MA
• Owned the core workflow automation engine used by 1,200+ enterprise customers including Fortune 500 accounts.
• Authored comprehensive PRDs and user requirements, cutting feature delivery lead times by 25% through improved engineering handoff rituals.
• Conducted 150+ qualitative customer discovery interviews and analyzed customer feedback to guide quarterly prioritization.
• Partnered with sales and marketing on competitive positioning to win key enterprise contracts worth $5.8M ARR.

EDUCATION
Columbia University — B.A. in Economics & Information Systems
September 2014 – May 2018 | Magna Cum Laude

CERTIFICATIONS
• Certified Scrum Product Owner (CSPO)
• Reforge Product Strategy & Growth Series Alum`,
    sampleJobDescription: `Principal Product Manager - Growth & Platform

We are seeking an experienced Product Manager to lead growth strategy and customer acquisition. You will define the multi-year product vision, lead experimentation, and drive bottom-line revenue.

What You'll Do:
• Define and execute product roadmaps aligned with company-wide OKRs.
• Lead cross-functional teams of engineers, data scientists, and designers.
• Run rigorous A/B testing programs to optimize conversion funnels and user activation.
• Conduct qualitative user research and dive deep into behavioral analytics (SQL, Amplitude).
• Partner with executive leadership to communicate strategy and commercial impact.`
  },
  {
    id: 'data-scientist',
    role: 'AI / Data Scientist',
    badge: 'AI & Data Science',
    resumeText: `PRIYA PATEL
Seattle, WA | (555) 789-0123 | priya.patel@email.com | github.com/priyapatel-ai | linkedin.com/in/priya-patel-data

PROFESSIONAL SUMMARY
Innovative Data Scientist and Machine Learning Engineer with 4+ years of hands-on experience designing, training, and deploying end-to-end NLP and predictive ML systems into production. Demonstrated impact improving recommendation precision by 28% and automating fraud detection algorithms saving $1.4M annually.

TECHNICAL PROFICIENCIES
Languages: Python, SQL, R, Bash
ML & Deep Learning: PyTorch, TensorFlow, Scikit-learn, Hugging Face Transformers, LangChain, LLMs
Data Engineering & Big Data: Spark, Pandas, NumPy, Kafka, Airflow, Snowflake
Cloud & MLOps: AWS SageMaker, MLflow, Docker, FastAPI, Git, CI/CD

PROFESSIONAL EXPERIENCE
Horizon Intelligence Labs — Senior Machine Learning Engineer
January 2022 – Present | Seattle, WA
• Developed and deployed a real-time semantic search and retrieval-augmented generation (RAG) system handling 12M monthly queries with sub-80ms response time.
• Fine-tuned open-source LLMs using LoRA and PyTorch, outperforming commercial API baselines by 14% on domain-specific classification tasks.
• Built production feature store and automated data validation pipelines with Apache Spark and Snowflake, eliminating data drift incidents.
• Optimized deep learning model inference using TensorRT and ONNX runtime, cutting GPU server compute costs by 35%.

Vanguard Analytics — Data Scientist
July 2020 – December 2021 | San Jose, CA
• Designed fraud detection gradient-boosted decision tree ensemble (XGBoost) evaluating 500k daily transactions, reducing false positives by 42%.
• Partnered with product teams to build customer churn prediction models, directly enabling customer success teams to retain $3.1M in endangered accounts.
• Automated data extraction and feature engineering ETL jobs using Airflow and PostgreSQL.

EDUCATION
University of Washington — M.S. in Data Science
2018 – 2020
University of California, Berkeley — B.S. in Applied Mathematics & Statistics
2014 – 2018`,
    sampleJobDescription: `Senior AI / Machine Learning Scientist

We are looking for an exceptional Machine Learning Scientist to lead our generative AI and NLP initiatives. 

Qualifications:
• Master's or PhD in Computer Science, Data Science, or related quantitative field.
• 3+ years experience building and deploying machine learning models in production.
• Expertise in Python, PyTorch, Hugging Face, Transformers, and LLMs / RAG architectures.
• Strong foundation in SQL, distributed data processing (Spark, Snowflake), and MLOps (Docker, SageMaker, MLflow).
• Experience fine-tuning deep learning models and optimizing inference latency.`
  }
];
