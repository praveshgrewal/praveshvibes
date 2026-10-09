import { SiteSettings, BlogPost, Project, Service, Resource, Testimonial } from '@/types';

export const initialSiteSettings: SiteSettings = {
  name: "Pravesh Grewal",
  tagline: "I Teach Technology. I Build What's Next.",
  bio: "Technology educator, Data Science & AI practitioner, and cybersecurity enthusiast dedicated to demystifying complex technical disciplines. Building high-impact digital solutions and empowering students and engineering teams globally.",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  email: "contact@praveshvibes.com",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  twitter_url: "https://twitter.com",
  youtube_url: "https://youtube.com",
  location: "New Delhi, India (Available Worldwide)",
  available_for_hire: true,
  years_experience: 5,
  students_trained_estimate: "1,500+"
};

export const initialServices: Service[] = [
  {
    id: "srv-data-analytics",
    title: "Data Analytics & Dashboards",
    slug: "data-analytics-dashboards",
    icon_name: "BarChart3",
    short_desc: "End-to-end data pipeline design, KPI tracking, and executive dashboards built in Power BI, Tableau, and modern web frameworks.",
    full_desc: "Transform messy, fragmented raw operational data into pristine automated reporting architectures. We model dimensional warehouses, automate ETL workflows in Python and SQL, and develop visually compelling, interactive executive dashboards that empower data-informed decision-making.",
    deliverables: [
      "Custom SQL / Python ETL data ingestion pipeline",
      "Interactive Power BI or Tableau dashboard",
      "Automated refresh scheduling & alerting",
      "Comprehensive data dictionary and handover training"
    ],
    pricing_note: "Custom project quote based on data complexity",
    turnaround: "1 - 3 weeks",
    active: true,
    order_index: 1
  },
  {
    id: "srv-data-science-ml",
    title: "Data Science & Predictive ML",
    slug: "data-science-predictive-ml",
    icon_name: "Cpu",
    short_desc: "Custom statistical modeling, predictive algorithms, customer segmentation, and automated machine learning workflows.",
    full_desc: "Harness statistical rigor and supervised/unsupervised machine learning models to predict churn, forecast demand, automate anomaly detection, and cluster high-value audiences. From feature engineering to model deployment with FastAPI.",
    deliverables: [
      "Exploratory Data Analysis (EDA) report with actionable findings",
      "Production-ready Python ML pipeline (scikit-learn / XGBoost / PyTorch)",
      "RESTful API containerized with Docker",
      "Model evaluation benchmarks and drift monitoring guidelines"
    ],
    pricing_note: "Scoped upon technical requirement review",
    turnaround: "2 - 4 weeks",
    active: true,
    order_index: 2
  },
  {
    id: "srv-ai-genai",
    title: "AI & Generative AI Applications",
    slug: "ai-generative-ai-apps",
    icon_name: "Sparkles",
    short_desc: "Bespoke Retrieval-Augmented Generation (RAG) systems, autonomous agents, and enterprise LLM integrations.",
    full_desc: "Supercharge your business workflows with tailored Generative AI. We build custom RAG knowledge bases connecting proprietary company documents to modern LLMs, autonomous task agents, and intelligent chatbots with strict hallucination safeguards and vector databases.",
    deliverables: [
      "Vector database setup (pgvector / Pinecone / Chroma)",
      "Hybrid semantic search and contextual reranking engine",
      "Context-aware LLM pipeline with prompt evaluation benchmarks",
      "Production frontend / backend integration"
    ],
    pricing_note: "Based on model infrastructure & vector architecture",
    turnaround: "2 - 5 weeks",
    active: true,
    order_index: 3
  },
  {
    id: "srv-fullstack-web",
    title: "Full-Stack Web Development",
    slug: "full-stack-web-development",
    icon_name: "Code2",
    short_desc: "Fast, responsive web applications built with Next.js, TypeScript, Tailwind CSS, Supabase, and Node.js.",
    full_desc: "Modern digital products need aesthetic excellence and rock-solid engineering. We design and engineer end-to-end full-stack web platforms, client portals, SaaS MVPs, and marketing platforms featuring modern animations, dark mode, robust security, and technical SEO.",
    deliverables: [
      "Next.js App Router codebase with TypeScript & Tailwind CSS",
      "Supabase / PostgreSQL relational schema with RLS security",
      "Authentication, file storage, and transactional email setup",
      "Vercel deployment with CI/CD and custom domain configuration"
    ],
    pricing_note: "Flexible milestones per project scope",
    turnaround: "3 - 6 weeks",
    active: true,
    order_index: 4
  },
  {
    id: "srv-cybersecurity",
    title: "Cybersecurity & Security Audits",
    slug: "cybersecurity-assessments",
    icon_name: "ShieldAlert",
    short_desc: "Authorized penetration testing, web app vulnerability assessments, and secure code reviews for businesses.",
    full_desc: "Proactively safeguard your infrastructure and applications against adversarial threats. We conduct authorized OWASP Top 10 web application assessments, Linux server hardening, cloud configuration reviews, and remediation advisory to ensure regulatory hygiene.",
    deliverables: [
      "Authorized vulnerability assessment report with severity scores (CVSS)",
      "Step-by-step proof-of-concept remediation instructions",
      "Developer security debriefing session",
      "Re-testing validation once fixes are committed"
    ],
    pricing_note: "Tiered per application surface & scope",
    turnaround: "1 - 2 weeks",
    active: true,
    order_index: 5
  },
  {
    id: "srv-corporate-training",
    title: "Corporate Training & Workshops",
    slug: "corporate-technical-training",
    icon_name: "GraduationCap",
    short_desc: "Hands-on, immersive masterclasses in Data Science, Generative AI, Python programming, and Ethical Hacking.",
    full_desc: "Empower your engineering, analytics, or business operations teams with practical, zero-fluff technical workshops. Curriculum combines interactive slides, live coding, and real-world Capstone projects tailored to your organization's specific tech stack.",
    deliverables: [
      "Custom syllabus tailored to your team's skill level",
      "Live interactive cohort workshops with hands-on labs",
      "Complete code repository, PDF cheat sheets, and reference notes",
      "Post-training Q&A session and office hours"
    ],
    pricing_note: "Custom per day or multi-week workshop bundle",
    turnaround: "Scheduled on demand",
    active: true,
    order_index: 6
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-rag-intel",
    title: "Enterprise RAG Intelligence Engine",
    slug: "enterprise-rag-intelligence-engine",
    summary: "Production-ready enterprise search and knowledge retrieval platform leveraging vector databases, semantic reranking, and secure LLM generation. (Sample Project)",
    category: "AI/ML",
    problem: "Enterprise teams were wasting an estimated 14 hours per week searching through hundreds of siloed technical documents, PDFs, and internal confluence pages without getting direct synthesized answers.",
    approach: "Designed a hybrid search architecture combining lexical BM25 matching and high-dimensional vector embeddings, augmented by a cross-encoder reranker before passing context to an LLM.",
    solution: "Built a Next.js frontend with Supabase pgvector backend, FastAPI orchestration worker, and strict hallucination guardrails. Included document citation links and source attribution highlights.",
    results: "Reduced research retrieval turnaround by 82% across internal testing cohorts, with high answer faithfulness verified through automated evaluation benchmarks.",
    tech_stack: ["Python", "FastAPI", "Next.js", "Supabase pgvector", "LangChain", "Tailwind CSS"],
    github_url: "https://github.com",
    live_url: "https://demo.praveshvibes.com",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    featured: true,
    published: true,
    created_at: "2026-03-15T09:00:00Z"
  },
  {
    id: "proj-cyber-recon",
    title: "Automated Attack Surface & Threat Recon Toolkit",
    slug: "automated-attack-surface-recon-toolkit",
    summary: "An ethical hacking automation framework that aggregates open-source intelligence, maps perimeter subdomains, and audits misconfigurations. (Sample Project)",
    category: "Cybersecurity",
    problem: "Security analysts routinely perform redundant manual recon tasks across multiple CLI tools (Amass, Sublist3r, Nmap), slowing incident response and authorized threat assessments.",
    approach: "Architected an asynchronous Python scanning daemon utilizing multi-threaded event loops, structured JSON outputs, and unified vulnerability scoring based on CVSS metrics.",
    solution: "Engineered a modular CLI and web dashboard that accepts domain targets, executes passive DNS enumeration, flags open insecure ports, and checks SSL/TLS cipher suites with automated report generation.",
    results: "Accelerated external surface discovery time from 4 hours to under 8 minutes per target scope while maintaining 100% authorization audit logs.",
    tech_stack: ["Python", "AsyncIO", "Bash", "Linux", "Docker", "Next.js", "Tailwind CSS"],
    github_url: "https://github.com",
    live_url: "https://demo.praveshvibes.com",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80",
    featured: true,
    published: true,
    created_at: "2026-04-02T10:30:00Z"
  },
  {
    id: "proj-churn-analytics",
    title: "Predictive Churn & Customer Lifetime Analytics Suite",
    slug: "predictive-churn-customer-analytics",
    summary: "Machine learning intelligence platform identifying high-risk customer turnover and delivering personalized retention recommendations. (Sample Project)",
    category: "Data Analytics",
    problem: "A subscription software client experienced silent customer attrition with no early-warning indicators, driving up acquisition costs by 35%.",
    approach: "Consolidated behavioral clickstream logs, billing history, and support ticket frequency. Engineered time-decay rolling metrics and trained an XGBoost classifier with SHAP explainability.",
    solution: "Deployed an automated pipeline outputting risk percentiles directly to executive Power BI dashboards, coupled with automated webhook triggers for customer success team interventions.",
    results: "Identified 88% of churn incidents at least 21 days prior to cancellation in retrospective testing, enabling proactive retention campaigns.",
    tech_stack: ["Python", "SQL", "scikit-learn", "XGBoost", "Power BI", "Pandas"],
    github_url: "https://github.com",
    live_url: "https://demo.praveshvibes.com",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    featured: true,
    published: true,
    created_at: "2026-05-18T14:15:00Z"
  },
  {
    id: "proj-modern-lms",
    title: "CampusVibe: Interactive Student Learning Platform",
    slug: "campusvibe-interactive-student-learning-platform",
    summary: "Full-stack educational platform with real-time code sandboxes, PDF notes viewer, automated quizzes, and student progress tracking. (Sample Project)",
    category: "Web Development",
    problem: "Traditional academic management systems suffer from clunky navigation, poor mobile ergonomics, and zero interactive coding capabilities for technical subjects.",
    approach: "Designed a lightweight, dark-mode first Next.js platform prioritizing sub-second page loads, mobile responsiveness, and client-side code execution in WebAssembly.",
    solution: "Engineered student resource downloads with instant previews, synchronized video bookmarks, and community discussion boards with markdown rendering.",
    results: "Achieved a 99 Lighthouse performance score and positive reviews from student pilot cohorts praised for clarity and interface delight.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "WebAssembly", "Framer Motion"],
    github_url: "https://github.com",
    live_url: "https://demo.praveshvibes.com",
    cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    published: true,
    created_at: "2026-06-25T11:45:00Z"
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-rag-guide",
    title: "Building Production-Grade RAG: From Naive Vectors to Hybrid Search & Reranking",
    slug: "building-production-grade-rag-hybrid-search",
    excerpt: "Why simple cosine similarity fails in production retrieval systems and how implementing BM25 hybrid search plus cross-encoder rerankers dramatically boosts LLM accuracy.",
    content: `## The Problem with "Toy" RAG

Most introductory tutorials on Retrieval-Augmented Generation (RAG) teach a naive pipeline:
1. Split your document into fixed-size chunks of 500 characters.
2. Generate vector embeddings using an OpenAI or Hugging Face model.
3. Store them in a vector database.
4. Compute cosine similarity against user query and feed the top 3 chunks into your prompt.

While this works well on simple textbook questions, it falls apart catastrophically in production settings:
- **Keyword blindness:** Vector models often fail at exact part numbers, error codes, and unique identifiers.
- **Lost context:** Fixed window chunking cuts off crucial table headers or qualifying conditional clauses.
- **Low semantic density:** Irrelevant chunks with similar lexical tone push out high-signal facts.

\`\`\`python
# Example: Hybrid Search Query in Python
def hybrid_search(query_text: str, query_vector: list, alpha: float = 0.5):
    """
    Combines dense semantic vector scoring with sparse BM25 keyword scoring.
    Alpha controls the weight: 1.0 is purely vector, 0.0 is purely BM25.
    """
    sparse_scores = bm25_index.get_scores(tokenize(query_text))
    dense_scores = vector_db.query_similar(query_vector, top_k=50)
    
    # Reciprocal Rank Fusion (RRF)
    combined_scores = reciprocal_rank_fusion(sparse_scores, dense_scores, k=60)
    return combined_scores[:20]
\`\`\`

## Enter Cross-Encoder Reranking

Bi-encoders (embedding models) compare text embeddings independently for fast lookup across millions of vectors. However, **Cross-Encoders** evaluate the query and candidate chunk simultaneously through transformer attention layers, providing exponentially higher relevance precision.

### Key Production Architecture
1. **Bi-encoder stage:** Retrieve the top 50 candidates using hybrid BM25 + dense vector search in under 30ms.
2. **Cross-encoder stage:** Pass candidate pairs through a lightweight reranker (such as \`bge-reranker-large\` or \`Cohere Rerank\`) to re-order the top 5 results.
3. **Context filtering:** Prune chunks below a confidence threshold before injecting them into the LLM context.

The difference in faithfulness and user satisfaction is night and day.`,
    category: "Generative AI",
    tags: ["RAG", "LLMs", "Vector DB", "Python", "Artificial Intelligence"],
    cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&auto=format&fit=crop&q=80",
    reading_time: "6 min read",
    published: true,
    views: 1420,
    created_at: "2026-06-10T12:00:00Z",
    updated_at: "2026-06-10T12:00:00Z",
    seo_title: "Building Production-Grade RAG: Hybrid Search & Reranking Guide",
    seo_description: "Learn how to build production RAG systems with hybrid search (BM25 + vectors) and cross-encoder rerankers for superior LLM retrieval accuracy."
  },
  {
    id: "post-sql-optimization",
    title: "SQL Performance Masterclass: EXPLAIN ANALYZE, Index Types, and Joins",
    slug: "sql-performance-masterclass-explain-analyze",
    excerpt: "Deep dive into PostgreSQL query planning. Understand sequential scans, B-Trees vs GIN indices, nested loops vs hash joins, and write blazing-fast queries.",
    content: `## Never Guess When You Can EXPLAIN

Query tuning is a core discipline for every data professional. When a query begins taking seconds instead of milliseconds, the first step is always inspecting the execution plan.

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT 
    u.id,
    u.email,
    COUNT(o.id) AS total_orders,
    SUM(o.amount) AS lifetime_value
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= NOW() - INTERVAL '90 days'
GROUP BY u.id, u.email
HAVING SUM(o.amount) > 500
ORDER BY lifetime_value DESC
LIMIT 50;
\`\`\`

### Reading the Execution Plan
Look out for these common bottlenecks:
- **Seq Scan on Large Tables:** Indicates missing or un-utilized indices.
- **High Shared Hit Buffers:** Shows how much disk/RAM page reading was required.
- **Nested Loop with Large Outer Rows:** May indicate that the planner anticipated few rows when reality yielded hundreds of thousands.

### Index Types: Choosing Beyond B-Tree
1. **B-Tree (Default):** Perfect for equality (\`=\`) and range checks (\`<\`, \`>\`, \`BETWEEN\`).
2. **GIN (Generalized Inverted Index):** Essential for JSONB keys, array memberships (\`@>\`), and full-text search.
3. **BRIN (Block Range Index):** Phenomenal for massive append-only time series logs with sequential timestamps, offering 99% smaller index sizes!`,
    category: "SQL",
    tags: ["SQL", "PostgreSQL", "Database Optimization", "Data Engineering"],
    cover_image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1000&auto=format&fit=crop&q=80",
    reading_time: "8 min read",
    published: true,
    views: 2180,
    created_at: "2026-07-04T15:30:00Z",
    updated_at: "2026-07-04T15:30:00Z",
    seo_title: "SQL Performance Tuning Guide: EXPLAIN ANALYZE and Index Optimization",
    seo_description: "Master PostgreSQL query optimization with EXPLAIN ANALYZE, B-Tree and GIN indexes, and high-performance join architectures."
  },
  {
    id: "post-web-security-owasp",
    title: "OWASP Top 10 in 2026: Modern Web Vulnerabilities & Practical Defense",
    slug: "owasp-top-10-modern-web-vulnerabilities-defense",
    excerpt: "A developer's checklist for securing modern web applications against SSRF, broken access controls, IDOR, and token poisoning.",
    content: `## Security is a Feature, Not an Afterthought

In modern distributed web apps, traditional SQL injection has reduced thanks to ORMs and parameterized queries, but logical vulnerabilities like **Broken Object Level Authorization (BOLA/IDOR)** and **Server-Side Request Forgery (SSRF)** remain rampant.

### 1. Insecure Direct Object References (IDOR)
Never trust user inputs to directly query records without tenant scoping:

\`\`\`typescript
// VULNERABLE
app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await db.invoices.findUnique({ where: { id: req.params.id } });
  return res.json(invoice);
});

// SECURE: Enforce authorization scope on the database layer
app.get('/api/invoices/:id', async (req, res) => {
  const userId = req.user.id;
  const invoice = await db.invoices.findFirst({
    where: { 
      id: req.params.id,
      tenantId: req.user.tenantId // Mandatory tenant guard
    }
  });
  if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
  return res.json(invoice);
});
\`\`\`

### 2. Defensive Hardening Checklist
- Enforce strict Row Level Security (RLS) policies at the database layer.
- Set CSP headers (\`Content-Security-Policy\`) prohibiting inline scripts.
- Sign cookies with \`HttpOnly\`, \`Secure\`, and \`SameSite=Lax\` flags.`,
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Web Security", "OWASP", "Ethical Hacking", "TypeScript"],
    cover_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80",
    reading_time: "7 min read",
    published: true,
    views: 1890,
    created_at: "2026-08-12T08:20:00Z",
    updated_at: "2026-08-12T08:20:00Z",
    seo_title: "OWASP Top 10 Web Vulnerabilities & Prevention Guide",
    seo_description: "Explore the most prevalent web application vulnerabilities including IDOR, SSRF, and authentication flaws, with secure coding patterns."
  }
];

export const initialResources: Resource[] = [
  {
    id: "res-python-ds-cheatsheet",
    title: "Python for Data Science & ML Comprehensive Cheat Sheet",
    slug: "python-data-science-ml-cheatsheet",
    description: "A 16-page distilled reference covering NumPy arrays, Pandas data wrangling, Scikit-Learn pipelines, and PyTorch tensors with code snippets and visual diagrams.",
    category: "Python",
    difficulty: "Beginner",
    file_type: "PDF",
    file_url: "/sample-resources/python-ds-cheatsheet.pdf",
    file_size: "2.4 MB",
    tags: ["Python", "Pandas", "NumPy", "Data Science"],
    download_count: 840,
    published: true,
    created_at: "2026-04-10T10:00:00Z"
  },
  {
    id: "res-sql-analytics-handbook",
    title: "Advanced SQL for Analytics: Window Functions & CTEs Handbook",
    slug: "advanced-sql-window-functions-handbook",
    description: "Real-world interview and industry problems solved with ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and recursive common table expressions.",
    category: "SQL",
    difficulty: "Intermediate",
    file_type: "PDF",
    file_url: "/sample-resources/sql-analytics-handbook.pdf",
    file_size: "1.8 MB",
    tags: ["SQL", "Analytics", "PostgreSQL", "Window Functions"],
    download_count: 1120,
    published: true,
    created_at: "2026-05-02T14:00:00Z"
  },
  {
    id: "res-powerbi-dax-guide",
    title: "Power BI DAX Patterns & Data Modeling Blueprint",
    slug: "power-bi-dax-patterns-data-modeling",
    description: "Star schema design best practices, CALCULATE filter context mastery, time intelligence patterns, and performance tuning for business analysts.",
    category: "Excel & Power BI",
    difficulty: "Intermediate",
    file_type: "Guide",
    file_url: "/sample-resources/powerbi-dax-blueprint.pdf",
    file_size: "3.1 MB",
    tags: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"],
    download_count: 670,
    published: true,
    created_at: "2026-05-20T11:30:00Z"
  },
  {
    id: "res-genai-llm-foundations",
    title: "Generative AI & LLM Architecture Architecture Guide",
    slug: "generative-ai-llm-architecture-guide",
    description: "From Attention Mechanisms and Transformer decoders to LoRA fine-tuning, quantization (GGUF/AWQ), and vector database embedding strategies.",
    category: "Generative AI",
    difficulty: "Advanced",
    file_type: "PDF",
    file_url: "/sample-resources/genai-architecture-guide.pdf",
    file_size: "4.5 MB",
    tags: ["Generative AI", "Transformers", "LLMs", "RAG"],
    download_count: 1450,
    published: true,
    created_at: "2026-06-15T09:15:00Z"
  },
  {
    id: "res-linux-networking-security",
    title: "Linux Command Line & Networking for Cybersecurity Enthusiasts",
    slug: "linux-networking-cybersecurity-handbook",
    description: "Crucial Bash scripting, permissions, systemd services, IPTables, Wireshark packet inspection, and SSH tunneling for ethical hacking students.",
    category: "Linux & Cloud",
    difficulty: "Beginner",
    file_type: "Cheat Sheet",
    file_url: "/sample-resources/linux-security-handbook.pdf",
    file_size: "2.1 MB",
    tags: ["Linux", "Bash", "Networking", "Cybersecurity"],
    download_count: 980,
    published: true,
    created_at: "2026-07-01T16:45:00Z"
  },
  {
    id: "res-ml-algorithms-notebook",
    title: "Applied Machine Learning Algorithms in Jupyter Notebooks",
    slug: "applied-machine-learning-algorithms-notebooks",
    description: "Hands-on Jupyter notebooks implementing Linear Regression, Random Forests, Gradient Boosted Trees, and Clustering with step-by-step mathematical intuition.",
    category: "Machine Learning",
    difficulty: "Intermediate",
    file_type: "Jupyter Notebook",
    file_url: "/sample-resources/ml-algorithms-notebook.zip",
    file_size: "5.8 MB",
    tags: ["Machine Learning", "Jupyter", "Scikit-Learn", "Python"],
    download_count: 890,
    published: true,
    created_at: "2026-07-22T13:20:00Z"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Aman Sharma",
    role: "Senior Data Analyst",
    company: "FinTech Enterprise",
    content: "Pravesh's training sessions on Advanced SQL and Power BI completely transformed our analytics team. Concepts that used to feel intimidating were explained with absolute clarity and practical intuition.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    published: true
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    role: "Product Lead",
    company: "AI Automation Labs",
    content: "We hired Pravesh to engineer our vector search and RAG knowledge retrieval backend. The delivery was ahead of schedule, impeccably tested, and decreased hallucination rates significantly.",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    published: true
  },
  {
    id: "test-3",
    name: "Rohan Patel",
    role: "B.Tech Computer Science Student",
    company: "Engineering University",
    content: "The notes and cheat sheets on Machine Learning and Linux are by far the cleanest student resources on the internet. Helped me crack my technical interviews on the first attempt!",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    published: true
  }
];
