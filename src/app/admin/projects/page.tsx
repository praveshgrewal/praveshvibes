'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProjects, saveProject, deleteProject } from '@/lib/data/store';
import { Project, ProjectCategory } from '@/types';
import { slugify } from '@/lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Code2, 
  CheckCircle2, 
  X, 
  Save, 
  Star,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES: ProjectCategory[] = [
  'AI/ML',
  'Data Analytics',
  'Cybersecurity',
  'Web Development',
  'Cloud & DevOps'
];

function AdminProjectsContent() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadProjects = async () => {
    const data = await getProjects(false);
    setProjects(data);
  };

  const createNewProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      slug: '',
      summary: '',
      category: 'AI/ML',
      problem: '',
      approach: '',
      solution: '',
      results: '',
      tech_stack: ['Python', 'Next.js'],
      github_url: 'https://github.com',
      live_url: '',
      cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      featured: false,
      published: true,
      created_at: new Date().toISOString()
    };
    setEditingProject(newProj);
  };

  useEffect(() => {
    loadProjects();
    if (searchParams.get('action') === 'new') {
      createNewProject();
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const toSave: Project = {
      ...editingProject,
      slug: editingProject.slug || slugify(editingProject.title)
    };

    await saveProject(toSave);
    await loadProjects();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this project?')) {
      await deleteProject(id);
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
      await loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
            Portfolio Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Manage showcase engineering case studies with full 4-pillar architectural breakdowns.
          </p>
        </div>

        <button
          type="button"
          onClick={createNewProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingProject && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border-2 border-[var(--secondary)]/30 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[var(--secondary)]" />
              <span>{editingProject.title ? `Editing: ${editingProject.title}` : 'Creating New Project'}</span>
            </h2>
            <button
              onClick={() => setEditingProject(null)}
              className="p-1.5 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Project case study saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingProject({
                      ...editingProject,
                      title,
                      slug: editingProject.slug ? editingProject.slug : slugify(title)
                    });
                  }}
                  placeholder="e.g. Enterprise RAG Intelligence Engine"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: slugify(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={editingProject.cover_image}
                  onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.tech_stack.join(', ')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Python, FastAPI, Next.js, Supabase"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">GitHub Repository URL</label>
                <input
                  type="url"
                  value={editingProject.github_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Live Demo URL</label>
                <input
                  type="url"
                  value={editingProject.live_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                  placeholder="https://demo.praveshvibes.com"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Summary</label>
              <textarea
                rows={2}
                required
                value={editingProject.summary}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                placeholder="High-level overview of the engineering project..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            {/* 4 Pillars Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">01. Problem Statement</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.problem}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">02. Approach &amp; Strategy</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.approach}
                  onChange={(e) => setEditingProject({ ...editingProject, approach: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">03. Engineering Solution</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.solution}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">04. Results &amp; Impact</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.results}
                  onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            {/* Checkboxes & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--glass-border)]">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--primary)] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[var(--foreground)]">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--primary)] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[var(--foreground)]">Published</span>
                </label>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">Registered Projects ({projects.length})</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--muted-text)]">
            <thead className="border-b border-[var(--glass-border)] text-[var(--foreground)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--foreground)] max-w-xs truncate">
                    {proj.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                      {proj.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {proj.featured ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" /> Featured
                      </span>
                    ) : (
                      <span className="text-[10px] text-[var(--subtle-text)]">Regular</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      proj.published
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {proj.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingProject(proj)}
                      className="p-1.5 rounded-lg text-[var(--primary)] hover:bg-[var(--primary)]/10 cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {proj.published && (
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10"
                        title="View Public Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete Project"
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

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--muted-text)]">Loading projects...</div>}>
      <AdminProjectsContent />
    </Suspense>
  );
}
