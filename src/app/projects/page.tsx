import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/data/store';
import { ProjectsClient } from '@/components/projects/ProjectsClient';
import { Code, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects Showcase & Case Studies',
  description: 'Explore production-grade technical projects in AI/ML, Data Analytics, Cybersecurity, and Web Development by Pravesh Grewal.',
};

export default async function ProjectsPage() {
  const projects = await getProjects(true);

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
          <Sparkles className="w-3.5 h-3.5" />
          Production Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Featured Projects &amp; Case Studies
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text)]">
          Explore architectural designs, engineering methodologies, and real-world outcomes across AI/ML, automated data pipelines, and cybersecurity tooling.
        </p>
      </div>

      {/* Interactive Projects Directory */}
      <ProjectsClient initialProjects={projects} />

    </div>
  );
}
