import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Clock, BookOpen, Sparkles } from 'lucide-react';

interface LatestBlogProps {
  posts: BlogPost[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
              Technical Writing &amp; Research
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Latest Technical Deep-Dives
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted-text)]">
              Real-world engineering guides covering Python, SQL tuning, RAG pipelines, and modern web application security.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold glass-panel glass-panel-hover text-[var(--foreground)] w-fit"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 text-[var(--secondary)]" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
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
                  
                  {/* Category Badge */}
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
                </div>
              </div>

              {/* Bottom Read More */}
              <div className="p-6 pt-0 mt-4 border-t border-[var(--glass-border)]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] group-hover:translate-x-1 transition-all pt-4"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
