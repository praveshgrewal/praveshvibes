'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState('admin@praveshvibes.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error || 'Failed to authenticate');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo and Heading */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--primary)] via-[var(--secondary)] to-[var(--accent-pink)] p-[2px] mx-auto shadow-lg">
            <div className="w-full h-full bg-[var(--card-bg)] rounded-[14px] flex items-center justify-center text-[var(--primary)]">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)]">
            Authenticate to manage articles, projects, student notes &amp; inquiries.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="p-8 rounded-3xl glass-panel space-y-6 border border-[var(--glass-border)] shadow-2xl">
          
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--subtle-text)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@praveshvibes.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--subtle-text)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development Credential Helper Banner */}
          <div className="p-4 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-1.5 text-xs text-[var(--subtle-text)]">
            <p className="font-bold text-[var(--foreground)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--secondary)]" />
              Bootstrap Credentials Notice
            </p>
            <p>
              When Supabase Auth is connected, use your Supabase administrator login.
            </p>
            <p className="font-mono text-[11px] text-[var(--primary)]">
              Local preview: admin@praveshvibes.com / admin123
            </p>
          </div>

        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-[var(--subtle-text)] hover:text-[var(--primary)] transition-colors">
            ← Return to public website
          </Link>
        </div>

      </div>
    </div>
  );
}
