import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Database,
  Layers,
  Terminal,
  BrainCircuit
} from 'lucide-react';

const PILLARS = [
  {
    title: "Data Analytics & Data Science",
    tagline: "Translating complex datasets into boardroom clarity.",
    icon: BarChart3,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-[var(--secondary)]",
    description: "Architecting clean dimensional models, automated ETL workflows, and interactive Power BI/Tableau dashboards. Rigorous exploratory analysis and statistical inference.",
    skills: ["Python", "SQL", "Power BI", "Tableau", "Pandas", "Statistical Modeling"],
    link: "/services#data-analytics-dashboards"
  },
  {
    title: "AI, Machine Learning & LLMs",
    tagline: "From classical predictors to state-of-the-art Generative AI.",
    icon: BrainCircuit,
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-[var(--primary)]",
    description: "Building production Retrieval-Augmented Generation (RAG) pipelines, semantic vector search, fine-tuned agent workflows, and predictive classifiers with scikit-learn & PyTorch.",
    skills: ["RAG Architecture", "LangChain", "Vector DBs", "PyTorch", "scikit-learn", "Hugging Face"],
    link: "/services#ai-generative-ai-apps"
  },
  {
    title: "Cybersecurity & Ethical Hacking",
    tagline: "Authorized vulnerability assessment & defensive hardening.",
    icon: ShieldCheck,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-[var(--accent-pink)]",
    description: "Authorized web application penetration testing, OWASP Top 10 auditing, Linux server hardening, network traffic packet inspection, and defensive posture remediation.",
    skills: ["Linux Hardening", "OWASP Top 10", "Network Recon", "Bash", "Burp Suite", "Wireshark"],
    link: "/services#cybersecurity-assessments"
  },
  {
    title: "Full-Stack Web Engineering",
    tagline: "Crafting resilient, high-speed, modern digital products.",
    icon: Code2,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-[var(--accent-green)]",
    description: "Engineering modern applications with Next.js App Router, TypeScript, Tailwind CSS, and Supabase. Seamless user experiences with sub-second page loads and zero bloat.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST & GraphQL"],
    link: "/services#full-stack-web-development"
  }
];

export function ExpertiseSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
            Core Engineering Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Comprehensive Technical Mastery
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-text)]">
            Bridging the gap between cutting-edge technology theory and high-impact industry execution.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-3xl p-8 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} border border-[var(--glass-border)] flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--subtle-text)] group-hover:text-[var(--primary)] transition-colors">
                      Specialization
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--primary)] mb-4">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pillar.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] text-[var(--foreground)] border border-[var(--glass-border)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <Link
                    href={pillar.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors"
                  >
                    <span>Explore offerings</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
