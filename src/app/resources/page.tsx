import React from 'react';
import type { Metadata } from 'next';
import { getResources } from '@/lib/data/store';
import { ResourcesClient } from '@/components/resources/ResourcesClient';
import { BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Notes & Learning Resources Library',
  description: 'Download free, high-yield student notes, cheat sheets, and code notebooks across Python, SQL, Power BI, Machine Learning, Deep Learning, Generative AI, Linux, and Cybersecurity.',
};

export default async function ResourcesPage() {
  const resources = await getResources(true);

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-green)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
          <Sparkles className="w-3.5 h-3.5" />
          Free Open-Access Study Materials
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Student Notes &amp; Handbooks
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text)]">
          Searchable, high-yield reference cheat sheets, algorithms notebooks, and interview handbooks designed to accelerate your engineering journey.
        </p>
      </div>

      {/* Interactive Resources Grid */}
      <ResourcesClient initialResources={resources} />

    </div>
  );
}
