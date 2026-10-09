'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Search, Clock, ArrowRight, BookOpen, Tag, Sparkles } from 'lucide-react';

export function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl glass-panel">
        
        {/* Category buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
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
            placeholder="Search articles or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[var(--subtle-text)] px-1">
        <span>Showing {filteredPosts.length} of {initialPosts.length} articles</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[var(--primary)] hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[var(--subtle-text)] mx-auto opacity-50" />
          <h3 className="text-xl font-bold text-[var(--foreground)]">No articles found</h3>
          <p className="text-sm text-[var(--muted-text)]">Try searching for other terms like &quot;RAG&quot;, &quot;SQL&quot;, or &quot;OWASP&quot;.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {post.category}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.reading_time}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-xs text-[var(--subtle-text)]">
                    {formatDate(post.created_at)}
                  </span>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[var(--muted-text)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-alt)] text-[var(--subtle-text)] border border-[var(--glass-border)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Read More */}
              <div className="p-6 pt-0 mt-4 border-t border-[var(--glass-border)]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] bg-[var(--surface-alt)]/50 hover:bg-[var(--primary)] hover:text-white transition-all mt-4"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
