'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto border-t border-[var(--glass-border)] bg-[var(--surface-alt)]/60 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[var(--primary)]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-black text-[var(--foreground)]">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] p-[2px]">
                <div className="w-full h-full bg-[var(--card-bg)] rounded-[10px] flex items-center justify-center">
                  <span className="gradient-text font-black text-lg">P</span>
                </div>
              </div>
              <span>Pravesh<span className="text-[var(--secondary)]">Vibes</span></span>
            </Link>

            <p className="text-base font-medium text-[var(--foreground)] italic">
              &ldquo;I Teach Technology. I Build What&apos;s Next.&rdquo;
            </p>

            <p className="text-sm text-[var(--muted-text)] leading-relaxed max-w-sm">
              Empowering developers, students, and businesses across Data Science, AI/ML, Generative AI, Cybersecurity, and Modern Web Applications.
            </p>

            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for select freelance & corporate training
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/praveshgrewal"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/praveshgrewal"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[#0077B5] hover:border-[#0077B5] transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@praveshvibes.com"
                aria-label="Email Pravesh"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">Explore</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-text)]">
              <li><Link href="/about" className="hover:text-[var(--primary)] transition-colors">About & Expertise</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--primary)] transition-colors">Projects Showcase</Link></li>
              <li><Link href="/services" className="hover:text-[var(--primary)] transition-colors">Freelancing Services</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Technical Articles</Link></li>
              <li><Link href="/resources" className="hover:text-[var(--primary)] transition-colors">Student Notes Library</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact & Inquiries</Link></li>
            </ul>
          </div>

          {/* Student Topics */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">Student Learning</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-text)]">
              <li><Link href="/resources?category=Python" className="hover:text-[var(--secondary)] transition-colors">Python for Data Science</Link></li>
              <li><Link href="/resources?category=SQL" className="hover:text-[var(--secondary)] transition-colors">SQL Analytics Cheat Sheets</Link></li>
              <li><Link href="/resources?category=Machine+Learning" className="hover:text-[var(--secondary)] transition-colors">Applied Machine Learning</Link></li>
              <li><Link href="/resources?category=Generative+AI" className="hover:text-[var(--secondary)] transition-colors">Generative AI & LLMs</Link></li>
              <li><Link href="/resources?category=Cybersecurity" className="hover:text-[var(--secondary)] transition-colors">Linux & Ethical Hacking</Link></li>
              <li><Link href="/resources" className="hover:text-[var(--secondary)] transition-colors flex items-center gap-1 font-medium text-[var(--secondary)]">All Free Notes <ArrowUpRight className="w-3.5 h-3.5" /></Link></li>
            </ul>
          </div>

          {/* Services & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">Client Services</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-text)]">
              <li><Link href="/services#data-analytics-dashboards" className="hover:text-[var(--primary)] transition-colors">Data Analytics & BI</Link></li>
              <li><Link href="/services#data-science-predictive-ml" className="hover:text-[var(--primary)] transition-colors">Predictive ML Solutions</Link></li>
              <li><Link href="/services#ai-generative-ai-apps" className="hover:text-[var(--primary)] transition-colors">RAG & GenAI Systems</Link></li>
              <li><Link href="/services#full-stack-web-development" className="hover:text-[var(--primary)] transition-colors">Full-Stack Web Dev</Link></li>
              <li><Link href="/services#cybersecurity-assessments" className="hover:text-[var(--primary)] transition-colors">Security Assessments</Link></li>
              <li><Link href="/services#corporate-technical-training" className="hover:text-[var(--primary)] transition-colors">Corporate Training</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--subtle-text)]">
          <p>© {currentYear} PraveshVibes. All rights reserved. Crafted with Next.js, TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-5">
            <Link href="/admin" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
            <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">
              Privacy & Inquiries
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
