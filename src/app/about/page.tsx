import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  getSiteSettings 
} from '@/lib/data/store';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Terminal, 
  ShieldCheck, 
  BrainCircuit, 
  BarChart3, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  FileText,
  MapPin,
  Calendar,
  Layers,
  BookOpen
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '@/components/ui/SocialIcons';

export const metadata: Metadata = {
  title: 'About & Technical Expertise',
  description: 'Learn about Pravesh Grewal — technology educator, full-stack AI practitioner, and cybersecurity enthusiast. Discover teaching methodologies, technical pillars, and credentials.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const CERTIFICATIONS = [
    {
      title: "Data Science & Machine Learning Specialization",
      issuer: "Verified Industry Credential",
      year: "2023",
      category: "Data Science / AI"
    },
    {
      title: "Certified Ethical Hacker / Web App Security",
      issuer: "Authorized Cyber Labs",
      year: "2023",
      category: "Cybersecurity"
    },
    {
      title: "Advanced SQL & Database Systems Architect",
      issuer: "Database Engineering Institute",
      year: "2022",
      category: "Data Engineering"
    },
    {
      title: "Modern Full-Stack Cloud Architect",
      issuer: "Cloud Platforms Group",
      year: "2024",
      category: "Web Engineering"
    }
  ];

  const EDUCATION = [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Affiliated Technical University",
      period: "2018 — 2022",
      focus: "Specialized in Distributed Systems, Relational Database Internals, and Neural Networks."
    }
  ];

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Hero Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Avatar / Photo (4 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl p-2 glass-panel border-2 border-[var(--glass-border)] shadow-2xl">
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-900">
              <img
                src={settings.avatar_url}
                alt={settings.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[var(--secondary)]">
                  Technology Practitioner
                </span>
                <h3 className="text-xl font-extrabold">{settings.name}</h3>
                <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                  {settings.location}
                </p>
              </div>
            </div>

            {/* Floating availability badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 whitespace-nowrap shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Open for Consultations &amp; Mentorship
            </div>
          </div>
        </div>

        {/* Right Bio (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
            <Sparkles className="w-3.5 h-3.5" />
            Educator &amp; Solution Builder
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            I Teach Technology.<br />
            <span className="gradient-text">I Build What&apos;s Next.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-text)] leading-relaxed">
            {settings.bio}
          </p>

          <p className="text-sm sm:text-base text-[var(--muted-text)] leading-relaxed">
            My journey bridges two complementary passions: delivering hardened, scalable systems for engineering clients, and creating clear, accessible educational materials for the next generation of software engineers and data scientists.
          </p>

          {/* Social connections */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href={settings.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={settings.twitter_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <TwitterIcon className="w-4 h-4 text-[#1DA1F2]" />
              <span>Twitter/X</span>
            </a>
            <a
              href={settings.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>YouTube</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Email Pravesh</span>
            </Link>
          </div>

        </div>

      </section>

      {/* Teaching Methodology / Pedagogy */}
      <section className="p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
            Pedagogical Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            The Three Tenets of Practical Technology Education
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-text)]">
            Too much online learning focuses on shallow syntax memorization while neglecting foundational mental models. My courses and student notes emphasize three unwavering principles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[var(--primary)] flex items-center justify-center font-black">
              01
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">First-Principles Intuition</h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
              Before running a model or writing a join, understand why the underlying mathematics or data structure behaves as it does. Intuition outlasts framework turnover.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[var(--secondary)] flex items-center justify-center font-black">
              02
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">Production Failure Modes</h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
              It&apos;s easy to get an algorithm working on a clean toy dataset. We teach edge cases: data leakage, cold start latency, memory overflows, and hostile adversarial inputs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-[var(--accent-pink)] flex items-center justify-center font-black">
              03
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">Reproducible Sandboxes</h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
              Every lesson comes with copy-pasteable Jupyter notebooks, executable SQL scripts, or Dockerized sandboxes so students can tinker and verify immediately.
            </p>
          </div>

        </div>
      </section>

      {/* Technical Pillars Deep Dive */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Discipline Breakdown
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
            Core Competencies &amp; Toolkit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[var(--secondary)] flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Data Analytics &amp; Data Science</h3>
                <p className="text-xs text-[var(--subtle-text)]">From Raw DBs to Boardroom Insight</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              Specialized in turning convoluted multi-table transactional architectures into organized dimensional data marts. Deep expertise with SQL window functions, CTEs, Power BI DAX expressions, Python Pandas pipelines, and statistical significance testing.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['SQL', 'PostgreSQL', 'Python', 'Power BI', 'DAX', 'Pandas', 'Tableau', 'Stats'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-[var(--primary)] flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">AI, Machine Learning &amp; LLMs</h3>
                <p className="text-xs text-[var(--subtle-text)]">Predictive Models &amp; Generative Systems</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              Deploying production Retrieval-Augmented Generation (RAG) engines utilizing hybrid BM25 + dense vector embeddings, cross-encoder rerankers, and LangChain orchestration. Classical supervised classifiers with XGBoost, LightGBM, and scikit-learn.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['LangChain', 'pgvector', 'PyTorch', 'scikit-learn', 'XGBoost', 'Hugging Face', 'FastAPI'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-[var(--accent-pink)] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Cybersecurity &amp; Ethical Hacking</h3>
                <p className="text-xs text-[var(--subtle-text)]">Defensive Engineering &amp; Threat Audits</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              Conducting authorized vulnerability assessments across OWASP Top 10 vectors (IDOR, SSRF, authentication bypass). Linux server hardening, firewall configuration, network packet analysis with Wireshark, and defensive code audits.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['OWASP Top 10', 'Linux Hardening', 'Burp Suite', 'Wireshark', 'Bash Recon', 'Nmap', 'Security Audits'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[var(--accent-green)] flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Full-Stack Web Development</h3>
                <p className="text-xs text-[var(--subtle-text)]">Modern Next.js &amp; Supabase Apps</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              Building responsive, high-performance web applications using the Next.js App Router, TypeScript, Tailwind CSS, Supabase, and PostgreSQL. Strict attention to web accessibility, core web vitals, zero FOUC, and modular design systems.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Docker', 'Vercel'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Education & Certifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Education */}
        <div className="p-8 rounded-3xl glass-panel space-y-6">
          <h3 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--secondary)]" />
            <span>Formal Education</span>
          </h3>

          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-[var(--glass-border)] pl-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                  {edu.period}
                </span>
                <h4 className="text-base font-bold text-[var(--foreground)]">
                  {edu.degree}
                </h4>
                <p className="text-xs font-semibold text-[var(--subtle-text)]">
                  {edu.institution}
                </p>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="p-8 rounded-3xl glass-panel space-y-6">
          <h3 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent-pink)]" />
            <span>Certifications &amp; Credentials</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                  {cert.category} • {cert.year}
                </span>
                <h4 className="text-xs font-bold text-[var(--foreground)]">
                  {cert.title}
                </h4>
                <p className="text-[11px] text-[var(--subtle-text)]">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="p-10 rounded-3xl glass-panel text-center max-w-4xl mx-auto space-y-6 border-2 border-[var(--glass-border)]">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
          Want to collaborate on a project or schedule a workshop?
        </h3>
        <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-xl mx-auto">
          Let&apos;s discuss how custom AI applications, data intelligence, or practical training can accelerate your team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-md"
          >
            Send an Inquiry
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 rounded-2xl text-sm font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
          >
            Explore Free Study Notes
          </Link>
        </div>
      </section>

    </div>
  );
}
