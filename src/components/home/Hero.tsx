'use client';

import React from 'react';
import Link from 'next/link';
import { HeroScene } from '@/components/3d/HeroScene';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Briefcase, 
  Sparkles, 
  Shield,
  Cpu,
  BarChart2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { SiteSettings } from '@/types';

interface HeroProps {
  settings?: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--primary)]/15 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[var(--secondary)]/15 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[var(--accent-pink)]/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel text-xs sm:text-sm font-semibold text-[var(--foreground)] shadow-xs mx-auto lg:mx-0">
              <img
                src={settings?.avatar_url || "/images/pravesh-avatar.png"}
                alt="Pravesh Grewal"
                className="w-6 h-6 rounded-full object-cover ring-2 ring-[var(--primary)] shrink-0"
              />
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent-green)] animate-ping" />
              <span>Technology Educator &amp; Full-Stack AI Engineer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span>I Teach Technology.</span>
              <br />
              <span className="gradient-text">I Build What&apos;s Next.</span>
            </h1>

            {/* Short Introduction */}
            <p className="text-lg sm:text-xl text-[var(--muted-text)] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Demystifying <strong className="text-[var(--foreground)] font-semibold">Data Science</strong>, <strong className="text-[var(--foreground)] font-semibold">Generative AI</strong>, and <strong className="text-[var(--foreground)] font-semibold">Cybersecurity</strong>. 
              Delivering bespoke enterprise systems, production machine learning solutions, and free notes for thousands of learners worldwide.
            </p>

            {/* Pillar Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                <BarChart2 className="w-3.5 h-3.5 text-[var(--secondary)]" /> Data Analytics &amp; ML
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" /> Generative AI &amp; RAG
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                <Shield className="w-3.5 h-3.5 text-[var(--accent-pink)]" /> Cybersecurity
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              {/* Primary 1: Explore Work */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Primary 2: Hire Me */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:scale-95 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                <span>Hire Me</span>
              </Link>

              {/* Secondary 1: Explore Notes */}
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm glass-panel glass-panel-hover text-[var(--foreground)]"
              >
                <BookOpen className="w-4 h-4 text-[var(--secondary)]" />
                <span>Free Notes</span>
              </Link>

              {/* Secondary 2: Blog */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm glass-panel glass-panel-hover text-[var(--foreground)]"
              >
                <FileText className="w-4 h-4 text-[var(--primary)]" />
                <span>Read Blog</span>
              </Link>
            </div>

            {/* Social Proof & Social Icons */}
            <div className="pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--card-bg)] bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                    AI
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--card-bg)] bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-bold text-xs flex items-center justify-center">
                    DS
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--card-bg)] bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
                    SEC
                  </div>
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-[var(--foreground)]">1,500+ Students &amp; Engineers</p>
                  <p className="text-[var(--subtle-text)]">Empowered through practical labs</p>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-[var(--glass-border)]" />

              {/* Social URLs */}
              <div className="flex items-center gap-2">
                <a
                  href={settings?.github_url || "https://github.com/praveshgrewal"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings?.linkedin_url || "https://linkedin.com/in/praveshgrewal"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[#0077B5] hover:border-[#0077B5] transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right 3D Visual Column (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[480px]">
              {/* Glass container wrapping 3D experience */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10 border border-[var(--glass-border)] backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center">
                <HeroScene />
              </div>

              {/* Floating interactive highlight card 1 */}
              <div className="absolute -bottom-4 -left-4 sm:left-2 p-3.5 rounded-2xl glass-panel shadow-xl flex items-center gap-3 animate-pulse-subtle max-w-[210px]">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[var(--primary)] flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[var(--foreground)]">LLM &amp; RAG Systems</p>
                  <p className="text-[var(--subtle-text)]">Production Ready</p>
                </div>
              </div>

              {/* Floating interactive highlight card 2 */}
              <div className="absolute -top-3 -right-3 p-3.5 rounded-2xl glass-panel shadow-xl flex items-center gap-3 max-w-[210px]" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-[var(--secondary)] flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[var(--foreground)]">Cyber Defense</p>
                  <p className="text-[var(--subtle-text)]">Authorized Audits</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
