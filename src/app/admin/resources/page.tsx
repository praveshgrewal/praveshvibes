'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getResources, saveResource, deleteResource } from '@/lib/data/store';
import { Resource, ResourceCategory, ResourceDifficulty, ResourceFileType } from '@/types';
import { slugify } from '@/lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FileDown, 
  BookOpen, 
  CheckCircle2, 
  X, 
  Save, 
  DownloadCloud,
  FileText
} from 'lucide-react';

const CATEGORIES: ResourceCategory[] = [
  'Python',
  'SQL',
  'Excel & Power BI',
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Linux & Cloud',
  'Cybersecurity'
];

const DIFFICULTIES: ResourceDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const FILE_TYPES: ResourceFileType[] = ['PDF', 'Cheat Sheet', 'Jupyter Notebook', 'Guide'];

function AdminResourcesContent() {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadResources = async () => {
    const data = await getResources(false);
    setResources(data);
  };

  const createNewResource = () => {
    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title: '',
      slug: '',
      description: '',
      category: 'Python',
      difficulty: 'Beginner',
      file_type: 'PDF',
      file_url: '/sample-resources/study-note.pdf',
      file_size: '2.5 MB',
      tags: ['Python', 'Notes'],
      download_count: 0,
      published: true,
      created_at: new Date().toISOString()
    };
    setEditingResource(newRes);
  };

  useEffect(() => {
    loadResources();
    if (searchParams.get('action') === 'new') {
      createNewResource();
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;

    const toSave: Resource = {
      ...editingResource,
      slug: editingResource.slug || slugify(editingResource.title)
    };

    await saveResource(toSave);
    await loadResources();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource note?')) {
      await deleteResource(id);
      if (editingResource?.id === id) {
        setEditingResource(null);
      }
      await loadResources();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-green)]">
            Student Library Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Study Notes &amp; Handbooks
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Upload student cheat sheets, manage downloadable PDFs, and update category tags.
          </p>
        </div>

        <button
          type="button"
          onClick={createNewResource}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Note</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingResource && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border-2 border-[var(--accent-green)]/30 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--accent-green)]" />
              <span>{editingResource.title ? `Editing: ${editingResource.title}` : 'Creating New Learning Resource'}</span>
            </h2>
            <button
              onClick={() => setEditingResource(null)}
              className="p-1.5 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resource note metadata saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Resource Title</label>
                <input
                  type="text"
                  required
                  value={editingResource.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingResource({
                      ...editingResource,
                      title,
                      slug: editingResource.slug ? editingResource.slug : slugify(title)
                    });
                  }}
                  placeholder="e.g. Python for Data Science Cheat Sheet"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingResource.slug}
                  onChange={(e) => setEditingResource({ ...editingResource, slug: slugify(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Category Track</label>
                <select
                  value={editingResource.category}
                  onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Difficulty</label>
                <select
                  value={editingResource.difficulty}
                  onChange={(e) => setEditingResource({ ...editingResource, difficulty: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Format</label>
                <select
                  value={editingResource.file_type}
                  onChange={(e) => setEditingResource({ ...editingResource, file_type: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
                >
                  {FILE_TYPES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">File Size</label>
                <input
                  type="text"
                  required
                  value={editingResource.file_size}
                  onChange={(e) => setEditingResource({ ...editingResource, file_size: e.target.value })}
                  placeholder="e.g. 2.4 MB"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">File URL / Storage Path</label>
                <input
                  type="text"
                  required
                  value={editingResource.file_url}
                  onChange={(e) => setEditingResource({ ...editingResource, file_url: e.target.value })}
                  placeholder="/sample-resources/note.pdf or Supabase URL"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingResource.tags.join(', ')}
                  onChange={(e) => setEditingResource({
                    ...editingResource,
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Python, Pandas, ML"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Description &amp; Learning Objectives</label>
              <textarea
                rows={3}
                required
                value={editingResource.description}
                onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                placeholder="Detailed summary of the material covered in this handbook..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            {/* Checkbox and Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--glass-border)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingResource.published}
                  onChange={(e) => setEditingResource({ ...editingResource, published: e.target.checked })}
                  className="w-4 h-4 rounded text-[var(--primary)] cursor-pointer"
                />
                <span className="text-xs font-bold text-[var(--foreground)]">Published in Student Library</span>
              </label>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingResource(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Resource</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Resources Table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">Available Notes ({resources.length})</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--muted-text)]">
            <thead className="border-b border-[var(--glass-border)] text-[var(--foreground)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]">
              {resources.map((res) => (
                <tr key={res.id} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--foreground)] max-w-xs truncate">
                    {res.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)]">
                      {res.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{res.difficulty}</td>
                  <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">{res.file_type}</td>
                  <td className="py-3.5 px-4">{res.download_count.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      res.published
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {res.published ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingResource(res)}
                      className="p-1.5 rounded-lg text-[var(--primary)] hover:bg-[var(--primary)]/10 cursor-pointer"
                      title="Edit Note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(res.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete Note"
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

export default function AdminResourcesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--muted-text)]">Loading resources...</div>}>
      <AdminResourcesContent />
    </Suspense>
  );
}
