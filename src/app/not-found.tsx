import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl glass-panel border border-[var(--glass-border)] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] p-[2px] mx-auto">
          <div className="w-full h-full bg-[var(--card-bg)] rounded-[14px] flex items-center justify-center font-black text-2xl gradient-text">
            404
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
            The resource, article, or route you requested does not exist or may have been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/resources"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold glass-panel text-[var(--foreground)] hover:bg-[var(--surface-alt)] transition-all"
          >
            <BookOpen className="w-4 h-4 text-[var(--secondary)]" />
            <span>Student Notes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
