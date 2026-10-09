import React from 'react';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data/store';
import { BlogClient } from '@/components/blog/BlogClient';
import { FileText, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Blog & Engineering Research',
  description: 'In-depth engineering tutorials, performance guides, and architectural breakdowns covering Python, SQL, RAG systems, Generative AI, and Cybersecurity.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
          <Sparkles className="w-3.5 h-3.5" />
          Engineering Publication
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Technical Articles &amp; Tutorials
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text)]">
          Deep dives into AI architectures, database indexing, LLM retrieval pipelines, and practical web vulnerability remediation.
        </p>
      </div>

      {/* Interactive Blog List */}
      <BlogClient initialPosts={posts} />

    </div>
  );
}
