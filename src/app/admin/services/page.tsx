'use client';

import React, { useEffect, useState } from 'react';
import { getServices, saveService } from '@/lib/data/store';
import { Service } from '@/types';
import { 
  Briefcase, 
  Edit3, 
  CheckCircle2, 
  X, 
  Save, 
  Clock, 
  Check, 
  Zap,
  Sparkles
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadServices = async () => {
    const data = await getServices(false);
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    await saveService(editingService);
    await loadServices();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
          Commercial Practice
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
          Freelancing &amp; Consulting Services
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-text)]">
          Configure service offerings, deliverables checklists, turnaround timelines, and inquiry routing.
        </p>
      </div>

      {/* Editor Modal */}
      {editingService && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border-2 border-[var(--secondary)]/30 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--secondary)]" />
              <span>Editing: {editingService.title}</span>
            </h2>
            <button
              onClick={() => setEditingService(null)}
              className="p-1.5 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Service details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Turnaround Estimate</label>
                <input
                  type="text"
                  value={editingService.turnaround || ''}
                  onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                  placeholder="e.g. 2 - 4 weeks"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Short Description (for cards)</label>
              <textarea
                rows={2}
                required
                value={editingService.short_desc}
                onChange={(e) => setEditingService({ ...editingService, short_desc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Full Description (for services page)</label>
              <textarea
                rows={4}
                required
                value={editingService.full_desc}
                onChange={(e) => setEditingService({ ...editingService, full_desc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Key Deliverables (one per line)
              </label>
              <textarea
                rows={4}
                value={editingService.deliverables.join('\n')}
                onChange={(e) => setEditingService({
                  ...editingService,
                  deliverables: e.target.value.split('\n').filter(Boolean)
                })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Pricing Policy Note</label>
              <input
                type="text"
                value={editingService.pricing_note || ''}
                onChange={(e) => setEditingService({ ...editingService, pricing_note: e.target.value })}
                placeholder="e.g. Scoped upon technical requirement review"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--glass-border)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.active}
                  onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[var(--primary)] cursor-pointer"
                />
                <span className="text-xs font-bold text-[var(--foreground)]">Active on Public Services Platform</span>
              </label>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--glass-border)] text-[var(--muted-text)] hover:text-[var(--foreground)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Service</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">Track #{srv.order_index || 1}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  srv.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {srv.active ? 'Active' : 'Disabled'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">{srv.title}</h3>
              <p className="text-xs text-[var(--muted-text)] leading-relaxed">{srv.short_desc}</p>
              
              <div className="pt-2 text-xs text-[var(--subtle-text)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Turnaround: {srv.turnaround || 'Standard'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--glass-border)]">
              <button
                type="button"
                onClick={() => setEditingService(srv)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Service Offering</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
