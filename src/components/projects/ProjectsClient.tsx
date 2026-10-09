'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Project, ProjectCategory } from '@/types';
import { Search, ExternalLink, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'AI/ML',
  'Data Analytics',
  'Cybersecurity',
  'Web Development'
];

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tech_stack.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl glass-panel">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'bg-[var(--surface-alt)] text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--glass-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-[var(--subtle-text)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[var(--subtle-text)] px-1">
        <span>Showing {filteredProjects.length} of {initialProjects.length} projects</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[var(--primary)] hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel text-center space-y-4">
          <Filter className="w-12 h-12 text-[var(--subtle-text)] mx-auto opacity-50" />
          <h3 className="text-xl font-bold text-[var(--foreground)]">No projects matched your criteria</h3>
          <p className="text-sm text-[var(--muted-text)]">Try searching for a different keyword or selecting a different category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Sample Project Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/80 text-white backdrop-blur-md">
                      Sample Case Study
                    </span>
                  </div>

                  {/* External Links */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
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
                        aria-label="Live Demo"
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
                  <p className="text-sm text-[var(--muted-text)] line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-alt)] text-[var(--subtle-text)] border border-[var(--glass-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0 mt-4 border-t border-[var(--glass-border)]">
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] bg-[var(--surface-alt)]/50 hover:bg-[var(--primary)] hover:text-white transition-all mt-4"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
