import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from '@/lib/data/store';
import { formatDate } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  User, 
  ArrowRight,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(false);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: `${post.title} | PraveshVibes`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      images: [{ url: post.cover_image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.cover_image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [allPosts, settings] = await Promise.all([
    getBlogPosts(true),
    getSiteSettings()
  ]);

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 2);

  // Extract headings for Table of Contents from markdown
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const text = match[1];
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    headings.push({ text, id });
  }

  return (
    <article className="py-12 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Top back navigation */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--surface-alt)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--glass-border)]">
            {post.category}
          </span>
          <span className="text-xs text-[var(--subtle-text)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.reading_time}
          </span>
          <span className="text-xs text-[var(--subtle-text)]">•</span>
          <span className="text-xs text-[var(--subtle-text)] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.created_at)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[var(--foreground)]">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted-text)] leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={settings.avatar_url}
              alt={settings.name}
              className="w-10 h-10 rounded-full object-cover border border-[var(--glass-border)]"
            />
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">{settings.name}</p>
              <p className="text-xs text-[var(--subtle-text)]">Technology Educator &amp; Full-Stack AI Engineer</p>
            </div>
          </div>

          <BlogShareButtons title={post.title} slug={post.slug} />
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel border border-[var(--glass-border)] shadow-xl bg-slate-950">
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Table of Contents (if 2 or more headings exist) */}
      {headings.length > 1 && (
        <aside className="p-6 rounded-2xl glass-panel space-y-3 border-l-4 border-l-[var(--secondary)]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
            Table of Contents
          </h2>
          <nav className="space-y-1.5">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.id}`}
                className="block text-sm text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors py-0.5"
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>
      )}

      {/* Article Body Content */}
      <main className="py-4">
        <MarkdownRenderer content={post.content} />
      </main>

      {/* Tags */}
      <div className="pt-6 border-t border-[var(--glass-border)] space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link
              key={t}
              href={`/blog?search=${encodeURIComponent(t)}`}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
            >
              #{t}
            </Link>
          ))}
        </div>
      </div>

      {/* Author Bio Box */}
      <div className="p-8 rounded-3xl glass-panel flex flex-col sm:flex-row items-center gap-6 border border-[var(--glass-border)]">
        <img
          src={settings.avatar_url}
          alt={settings.name}
          className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-[var(--glass-border)]"
        />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">Written by</span>
          <h3 className="text-lg font-bold text-[var(--foreground)]">{settings.name}</h3>
          <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
            {settings.bio}
          </p>
          <div className="pt-1">
            <Link href="/about" className="text-xs font-bold text-[var(--secondary)] hover:underline inline-flex items-center gap-1">
              Read educator profile <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-10 border-t border-[var(--glass-border)] space-y-6">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Continue Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[var(--muted-text)] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[var(--secondary)]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </article>
  );
}
