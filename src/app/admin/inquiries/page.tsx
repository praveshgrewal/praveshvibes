'use client';

import React, { useEffect, useState } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/data/store';
import { ContactInquiry } from '@/types';
import { formatDate } from '@/lib/utils';
import { 
  Inbox, 
  Trash2, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeInquiry, setActiveInquiry] = useState<ContactInquiry | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getInquiries();
      setInquiries(list);
      if (list.length > 0) {
        if (!activeInquiry) {
          setActiveInquiry(list[0]);
        } else {
          const stillExists = list.find((i) => i.id === activeInquiry.id);
          setActiveInquiry(stillExists || list[0]);
        }
      } else {
        setActiveInquiry(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: ContactInquiry['status']) => {
    await updateInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    if (activeInquiry?.id === id) {
      setActiveInquiry({ ...activeInquiry, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      await deleteInquiry(id);
      const updated = inquiries.filter((i) => i.id !== id);
      setInquiries(updated);
      if (activeInquiry?.id === id) {
        setActiveInquiry(updated[0] || null);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (selectedStatus === 'all') return true;
    return inq.status === selectedStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-pink)]">
            Inbound Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Client &amp; Student Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Review incoming project proposals, corporate training requests, and questions.
          </p>
        </div>
        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold glass-panel glass-panel-hover text-[var(--foreground)] cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[var(--primary)]' : ''}`} />
          <span>{loading ? 'Refreshing...' : 'Refresh Inquiries'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-2 rounded-2xl glass-panel w-fit">
        {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              selectedStatus === status
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
            }`}
          >
            {status} ({status === 'all' ? inquiries.length : inquiries.filter(i => i.status === status).length})
          </button>
        ))}
      </div>

      {/* Main 2-Column Interface: List (5 cols) and Detail View (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="p-8 rounded-2xl glass-panel text-center text-xs text-[var(--muted-text)]">
              No inquiries matching this status.
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = activeInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => setActiveInquiry(inq)}
                  className={`p-4 rounded-2xl glass-panel transition-all cursor-pointer space-y-2 border ${
                    isSelected
                      ? 'border-[var(--primary)] shadow-md bg-[var(--surface-alt)]'
                      : 'hover:border-[var(--glass-border)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--foreground)] truncate max-w-[150px]">
                      {inq.name}
                    </span>
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

                  <p className="text-xs font-semibold text-[var(--primary)] truncate">
                    {inq.subject}
                  </p>

                  <p className="text-xs text-[var(--muted-text)] line-clamp-2">
                    {inq.message}
                  </p>

                  <div className="text-[10px] text-[var(--subtle-text)] flex items-center justify-between pt-1">
                    <span>{inq.service_category}</span>
                    <span>{formatDate(inq.created_at)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7">
          {activeInquiry ? (
            <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border border-[var(--glass-border)] shadow-xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--glass-border)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{activeInquiry.subject}</h2>
                  <p className="text-xs text-[var(--subtle-text)] mt-1">
                    Submitted on {formatDate(activeInquiry.created_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={activeInquiry.status}
                    onChange={(e) => handleStatusChange(activeInquiry.id, e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(activeInquiry.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] text-xs">
                <div>
                  <span className="font-bold text-[var(--subtle-text)] uppercase tracking-wider text-[10px]">Sender Name:</span>
                  <p className="font-bold text-sm text-[var(--foreground)] mt-0.5">{activeInquiry.name}</p>
                </div>
                <div>
                  <span className="font-bold text-[var(--subtle-text)] uppercase tracking-wider text-[10px]">Email Address:</span>
                  <p className="font-semibold text-sm text-[var(--primary)] mt-0.5">
                    <a href={`mailto:${activeInquiry.email}`} className="hover:underline flex items-center gap-1">
                      {activeInquiry.email} <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
                <div>
                  <span className="font-bold text-[var(--subtle-text)] uppercase tracking-wider text-[10px]">Requested Category:</span>
                  <p className="font-semibold text-[var(--foreground)] mt-0.5">{activeInquiry.service_category}</p>
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                  Message Content:
                </span>
                <div className="p-5 rounded-2xl bg-[var(--surface-alt)]/50 border border-[var(--glass-border)] text-sm text-[var(--foreground)] whitespace-pre-wrap leading-relaxed">
                  {activeInquiry.message}
                </div>
              </div>

              {/* Quick Reply Action */}
              <div className="pt-4 border-t border-[var(--glass-border)]">
                <a
                  href={`mailto:${activeInquiry.email}?subject=${encodeURIComponent(`Re: ${activeInquiry.subject}`)}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email Client</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl glass-panel text-center text-xs text-[var(--muted-text)]">
              Select an inquiry from the left to view complete details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
