'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  getStatsOverview, 
  getInquiries, 
  updateInquiryStatus 
} from '@/lib/data/store';
import { ContactInquiry, StatsOverview } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Code2, 
  BookOpen, 
  Inbox, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Database,
  Plus,
  RefreshCw,
  Settings
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseActive, setSupabaseActive] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [s, inqs] = await Promise.all([
      getStatsOverview(),
      getInquiries()
    ]);
    setStats(s);
    setInquiries(inqs);
    setSupabaseActive(isSupabaseConfigured());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ContactInquiry['status']) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    // Reload stats
    const updatedStats = await getStatsOverview();
    setStats(updatedStats);
  };

  return (
    <div className="space-y-10">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Manage your personal brand, publishing pipelines, student resources, and incoming client leads.
          </p>
        </div>

        {/* Database Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--glass-border)] text-xs">
          <Database className="w-4 h-4 text-[var(--secondary)]" />
          <span className="text-[var(--subtle-text)]">Database:</span>
          {supabaseActive ? (
            <span className="font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Supabase Live
            </span>
          ) : (
            <span className="font-semibold text-amber-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Local Persistent Mode
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row (4 cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Articles</span>
            <FileText className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.totalArticles ?? '—'}
          </p>
          <Link href="/admin/blog" className="text-xs text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1">
            Manage Blog <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Projects</span>
            <Code2 className="w-4 h-4 text-[var(--secondary)]" />
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.totalProjects ?? '—'}
          </p>
          <Link href="/admin/projects" className="text-xs text-[var(--secondary)] font-medium hover:underline inline-flex items-center gap-1">
            Manage Projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Notes &amp; PDFs</span>
            <BookOpen className="w-4 h-4 text-[var(--accent-green)]" />
          </div>
          <p className="text-3xl font-black text-[var(--foreground)]">
            {stats?.totalResources ?? '—'}
          </p>
          <Link href="/admin/resources" className="text-xs text-[var(--accent-green)] font-medium hover:underline inline-flex items-center gap-1">
            Manage Resources <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Inquiries</span>
            <Inbox className="w-4 h-4 text-[var(--accent-pink)]" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-[var(--foreground)]">
              {stats?.totalInquiries ?? '—'}
            </p>
            {stats && stats.newInquiries > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                {stats.newInquiries} new
              </span>
            )}
          </div>
          <Link href="/admin/inquiries" className="text-xs text-[var(--accent-pink)] font-medium hover:underline inline-flex items-center gap-1">
            View Inquiries <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
          Quick Launch Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/blog?action=new"
            className="p-3.5 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] hover:border-[var(--primary)] text-xs font-bold text-[var(--foreground)] flex items-center gap-2.5 transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--primary)]" />
            <span>Write Article</span>
          </Link>

          <Link
            href="/admin/projects?action=new"
            className="p-3.5 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] hover:border-[var(--secondary)] text-xs font-bold text-[var(--foreground)] flex items-center gap-2.5 transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--secondary)]" />
            <span>New Project</span>
          </Link>

          <Link
            href="/admin/resources?action=new"
            className="p-3.5 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] hover:border-[var(--accent-green)] text-xs font-bold text-[var(--foreground)] flex items-center gap-2.5 transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--accent-green)]" />
            <span>Upload Note</span>
          </Link>

          <Link
            href="/admin/settings"
            className="p-3.5 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] hover:border-[var(--accent-pink)] text-xs font-bold text-[var(--foreground)] flex items-center gap-2.5 transition-all"
          >
            <Settings className="w-4 h-4 text-[var(--accent-pink)]" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries Panel */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">Recent Client Inquiries</h2>
            <p className="text-xs text-[var(--muted-text)]">Direct incoming inquiries submitted via the contact form.</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-[var(--primary)] hover:underline"
          >
            View All
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--muted-text)]">
            No inquiries received yet.
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--foreground)]">{inq.name}</span>
                    <span className="text-xs text-[var(--subtle-text)]">({inq.email})</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      inq.status === 'new'
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : inq.status === 'replied'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[var(--primary)]">{inq.subject}</p>
                  <p className="text-xs text-[var(--muted-text)] line-clamp-1">{inq.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-xl text-xs bg-[var(--card-bg)] border border-[var(--glass-border)] text-[var(--foreground)] cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
