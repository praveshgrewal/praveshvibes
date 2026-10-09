'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '@/lib/data/store';
import { BlogPost } from '@/types';
import { slugify, estimateReadingTime } from '@/lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  FileText, 
  CheckCircle2, 
  X, 
  Save, 
  Clock, 
  Calendar,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

function AdminBlogContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadPosts = async () => {
    const data = await getBlogPosts(false);
    setPosts(data);
  };

  const createNewPost = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      content: '## Introduction\n\nWrite your technical article here in Markdown...',
      category: 'Generative AI',
      tags: ['AI', 'Python'],
      cover_image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&auto=format&fit=crop&q=80',
      reading_time: '5 min read',
      published: false,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      seo_title: '',
      seo_description: ''
    };
    setEditingPost(newPost);
  };

  useEffect(() => {
    loadPosts();
    if (searchParams.get('action') === 'new') {
      createNewPost();
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const computedReadingTime = estimateReadingTime(editingPost.content);
    const postToSave: BlogPost = {
      ...editingPost,
      slug: editingPost.slug || slugify(editingPost.title),
      reading_time: computedReadingTime,
      updated_at: new Date().toISOString()
    };

    await saveBlogPost(postToSave);
    await loadPosts();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this article?')) {
      await deleteBlogPost(id);
      if (editingPost?.id === id) {
        setEditingPost(null);
      }
      await loadPosts();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Content Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Technical Blog Publications
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Draft, edit, publish, or preview high-yield technical tutorials.
          </p>
        </div>

        <button
          type="button"
          onClick={createNewPost}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Editor Modal / Workspace */}
      {editingPost && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border-2 border-[var(--primary)]/30 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              <span>{editingPost.title ? `Editing: ${editingPost.title}` : 'Drafting New Article'}</span>
            </h2>
            <button
              onClick={() => setEditingPost(null)}
              className="p-1.5 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Article saved successfully to persistent storage!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Title</label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingPost({
                      ...editingPost,
                      title,
                      slug: editingPost.slug ? editingPost.slug : slugify(title)
                    });
                  }}
                  placeholder="e.g. Building Production RAG Pipelines"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: slugify(e.target.value) })}
                  placeholder="building-production-rag-pipelines"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Category</label>
                <input
                  type="text"
                  required
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  placeholder="Generative AI / SQL / etc."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={editingPost.cover_image}
                  onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingPost.tags.join(', ')}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="RAG, Python, LLMs"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Excerpt / Summary</label>
              <textarea
                rows={2}
                required
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Short 2-line description for search results & cards..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            {/* Markdown Content with Live Preview Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Article Content (Markdown)
                </label>
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isPreview ? 'Switch to Editor' : 'Toggle Live Preview'}</span>
                </button>
              </div>

              {isPreview ? (
                <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] min-h-[300px] prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-[var(--foreground)]">{editingPost.content}</pre>
                </div>
              ) : (
                <textarea
                  rows={14}
                  required
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="## Heading\n\nUse Markdown with code blocks: ```python ... ```"
                  className="w-full p-4 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono resize-y"
                />
              )}
            </div>

            {/* Publishing Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--glass-border)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPost.published}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="w-4 h-4 rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-bold text-[var(--foreground)]">
                  Published Publicly (Uncheck to keep as draft)
                </span>
              </label>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Article</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">All Registered Articles ({posts.length})</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--muted-text)]">
            <thead className="border-b border-[var(--glass-border)] text-[var(--foreground)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--foreground)] max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      post.published
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{post.reading_time}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingPost(post)}
                      className="p-1.5 rounded-lg text-[var(--primary)] hover:bg-[var(--primary)]/10 cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {post.published && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--muted-text)]">Loading articles...</div>}>
      <AdminBlogContent />
    </Suspense>
  );
}
