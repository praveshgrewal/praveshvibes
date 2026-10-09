import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/data/store';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  TrendingUp, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects(false);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | PraveshVibes`,
      description: project.summary,
      images: [{ url: project.cover_image }],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects(true);
  const relatedProjects = allProjects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--surface-alt)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--glass-border)]">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Sample Case Study
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[var(--foreground)]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted-text)] leading-relaxed">
          {project.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-md transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live System</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Showcase Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel border-2 border-[var(--glass-border)] shadow-2xl bg-slate-950">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tech Stack Pills */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
          Technologies &amp; Architecture:
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 4 Pillars of the Case Study: Problem, Approach, Solution, Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Problem */}
        <div className="p-8 rounded-3xl glass-panel space-y-4 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
            <AlertCircle className="w-5 h-5" />
            <span>01. The Problem</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Friction &amp; Context</h3>
          <p className="text-sm text-[var(--muted-text)] leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Approach */}
        <div className="p-8 rounded-3xl glass-panel space-y-4 border-l-4 border-l-cyan-500">
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm uppercase tracking-wider">
            <Lightbulb className="w-5 h-5" />
            <span>02. The Approach</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Architectural Strategy</h3>
          <p className="text-sm text-[var(--muted-text)] leading-relaxed">
            {project.approach}
          </p>
        </div>

        {/* Solution */}
        <div className="p-8 rounded-3xl glass-panel space-y-4 border-l-4 border-l-[var(--primary)]">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-sm uppercase tracking-wider">
            <Layers className="w-5 h-5" />
            <span>03. The Solution</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Engineering Implementation</h3>
          <p className="text-sm text-[var(--muted-text)] leading-relaxed">
            {project.solution}
          </p>
        </div>

        {/* Results */}
        <div className="p-8 rounded-3xl glass-panel space-y-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-wider">
            <TrendingUp className="w-5 h-5" />
            <span>04. The Results</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Measured Impact</h3>
          <p className="text-sm text-[var(--muted-text)] leading-relaxed">
            {project.results}
          </p>
        </div>

      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-8 border-t border-[var(--glass-border)] space-y-8">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Related Case Studies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.slug}`}
                className="group p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                    {rel.category}
                  </span>
                  <h4 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[var(--muted-text)] line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-[var(--secondary)]">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry CTA */}
      <div className="p-8 rounded-3xl glass-panel text-center max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Need a comparable solution built?</h3>
        <p className="text-sm text-[var(--muted-text)]">Let&apos;s evaluate your technical specification and build an end-to-end prototype.</p>
        <Link
          href={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${project.title}`)}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs"
        >
          <span>Initiate Project Inquiry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
