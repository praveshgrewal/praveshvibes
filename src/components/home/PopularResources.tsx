'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Resource } from '@/types';
import { 
  FileDown, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  DownloadCloud, 
  FileText, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { incrementResourceDownload } from '@/lib/data/store';
import confetti from 'canvas-confetti';

interface PopularResourcesProps {
  resources: Resource[];
}

export function PopularResources({ resources }: PopularResourcesProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const displayResources = resources.slice(0, 4);

  const handleDownload = async (resource: Resource) => {
    setDownloadingId(resource.id);
    await incrementResourceDownload(resource.id);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // Ignore if confetti fails
    }

    // Trigger download of sample file or mock download
    setTimeout(() => {
      setDownloadingId(null);
      // Simulate file download
      const blob = new Blob([
        `PraveshVibes Study Notes\nResource: ${resource.title}\nCategory: ${resource.category}\nDifficulty: ${resource.difficulty}\nVisit https://praveshvibes.com for more notes!`
      ], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.slug}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 600);
  };

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-green)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
              Free Student Notes &amp; Handbooks
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Community Learning Repository
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted-text)]">
              Curated, zero-fluff study material, cheat sheets, and code notebooks designed for learners and engineering students.
            </p>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold glass-panel glass-panel-hover text-[var(--foreground)] w-fit"
          >
            <span>Explore All Resources</span>
            <ArrowRight className="w-4 h-4 text-[var(--secondary)]" />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayResources.map((resource) => (
            <div
              key={resource.id}
              className="group rounded-3xl p-6 glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--glass-border)]">
                    {resource.category}
                  </span>
                  
                  <div className="flex items-center gap-2 text-xs text-[var(--subtle-text)]">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] font-medium">
                      {resource.difficulty}
                    </span>
                    <span>•</span>
                    <span className="font-medium">{resource.file_size}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-6">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-alt)] text-[var(--subtle-text)] border border-[var(--glass-border)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--subtle-text)] flex items-center gap-1">
                  <DownloadCloud className="w-3.5 h-3.5" />
                  {resource.download_count.toLocaleString()} downloads
                </span>

                <button
                  type="button"
                  onClick={() => handleDownload(resource)}
                  disabled={downloadingId === resource.id}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{downloadingId === resource.id ? 'Downloading...' : 'Download Note'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
