import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { ArrowRight, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
              Engineering Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Featured Case Studies &amp; Projects
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted-text)]">
              Production-tested systems built with rigorous attention to architecture, scalability, and developer ergonomics.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold glass-panel glass-panel-hover text-[var(--foreground)] w-fit"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-[var(--secondary)]" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image & Category Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Sample Label Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/80 text-white backdrop-blur-md">
                      Sample Case Study
                    </span>
                  </div>

                  {/* External Links on Image */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View Source Code on GitHub"
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View Live Project Demo"
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-alt)] text-[var(--subtle-text)] border border-[var(--glass-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium text-[var(--subtle-text)]">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Case Study Link */}
              <div className="p-6 pt-0 mt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] bg-[var(--surface-alt)]/50 hover:bg-[var(--primary)] hover:text-white transition-all"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
