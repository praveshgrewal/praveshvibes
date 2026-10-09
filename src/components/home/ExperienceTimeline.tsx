import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Terminal, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const TIMELINE = [
  {
    period: "2024 — Present",
    role: "Full-Stack AI Engineer & Lead Technical Educator",
    organization: "PraveshVibes Studio & Freelance Practice",
    description: "Leading custom AI agent and RAG development for enterprise clients. Conducting cohort-based masterclasses on Python, Applied Machine Learning, SQL optimization, and Cybersecurity for engineering students and corporate teams.",
    highlights: [
      "Designed and deployed enterprise hybrid search (BM25 + pgvector) RAG pipelines.",
      "Trained 1,500+ students across university bootcamps and interactive webinars.",
      "Published 30+ comprehensive open-source cheat sheets and technical research posts."
    ]
  },
  {
    period: "2022 — 2024",
    role: "Data Analytics & ML Consultant",
    organization: "Analytics Solutions Practice",
    description: "Engineered scalable data models, automated Python ETL pipelines, and executive Power BI dashboards. Modeled customer churn risk and automated predictive reporting systems.",
    highlights: [
      "Automated multi-source ingestion workflows handling millions of transactional records.",
      "Built ML scoring models reducing manual audit requirements by over 40%."
    ]
  },
  {
    period: "2020 — 2022",
    role: "Computer Science & Cybersecurity Educator",
    organization: "Academic Training & Labs",
    description: "Conducted hands-on laboratory sessions in Linux systems administration, networking protocols (TCP/IP), bash scripting, and ethical security fundamentals.",
    highlights: [
      "Mentored student cohorts in hands-on capture-the-flag (CTF) security exercises.",
      "Authored foundational lecture handbooks still referenced across student communities."
    ]
  }
];

const SKILL_CATEGORIES = [
  {
    category: "Languages & Frameworks",
    skills: ["Python", "SQL (PostgreSQL)", "TypeScript", "Next.js", "React", "Node.js", "FastAPI"]
  },
  {
    category: "AI / Data Science & ML",
    skills: ["LangChain", "RAG Systems", "pgvector", "PyTorch", "scikit-learn", "Pandas", "Power BI", "Tableau"]
  },
  {
    category: "Security & Infrastructure",
    skills: ["Linux Server Hardening", "OWASP Top 10", "Network Recon", "Docker", "Git/GitHub", "Vercel", "Supabase"]
  }
];

export function ExperienceTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
            Track Record &amp; Pedagogy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Experience &amp; Teaching Philosophy
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-text)]">
            A balanced synthesis of real-world production engineering and committed mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--primary)]" />
              <span>Professional Milestones</span>
            </h3>

            <div className="relative border-l-2 border-[var(--glass-border)] ml-3 pl-8 space-y-10">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-[var(--card-bg)] border-2 border-[var(--primary)] group-hover:scale-125 transition-transform" />

                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                    {item.period}
                  </span>
                  
                  <h4 className="text-lg font-bold text-[var(--foreground)] mt-1">
                    {item.role}
                  </h4>
                  
                  <p className="text-xs font-semibold text-[var(--subtle-text)] mb-3">
                    {item.organization}
                  </p>
                  
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--muted-text)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--secondary)] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Stack & Mentorship Values (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Tech Stack Matrix */}
            <div className="p-7 rounded-3xl glass-panel space-y-6">
              <h3 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[var(--secondary)]" />
                <span>Verified Tooling Stack</span>
              </h3>

              <div className="space-y-5">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educator Philosophy Card */}
            <div className="p-7 rounded-3xl glass-panel relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-[var(--primary)]">
                <GraduationCap className="w-24 h-24" />
              </div>

              <div className="space-y-3 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-pink)]">
                  Teaching Philosophy
                </span>
                <h4 className="text-lg font-bold text-[var(--foreground)]">
                  &ldquo;Theory without hands-on code is hollow.&rdquo;
                </h4>
                <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                  Every concept—whether backpropagation in neural networks, PostgreSQL index internals, or network packet sniffing—is best taught through reproducible, interactive sandboxes.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
