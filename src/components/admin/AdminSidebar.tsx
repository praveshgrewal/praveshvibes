'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from './AdminAuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Code2, 
  BookOpen, 
  Briefcase, 
  Inbox, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: Code2 },
  { href: '/admin/resources', label: 'Study Resources', icon: BookOpen },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  return (
    <aside className="w-64 bg-[var(--card-bg)] border-r border-[var(--glass-border)] min-h-[calc(100vh-80px)] flex flex-col justify-between p-4 shrink-0">
      
      <div className="space-y-6">
        {/* User Info Bar */}
        <div className="p-3.5 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[var(--primary)] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[var(--foreground)] truncate">
              {user?.email || 'Admin Portal'}
            </p>
            <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Authenticated Session
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[var(--glass-border)] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
