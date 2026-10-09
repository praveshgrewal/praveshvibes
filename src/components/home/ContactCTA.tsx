import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles, MessageSquare } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-[var(--primary)]/15 via-[var(--secondary)]/15 to-[var(--accent-pink)]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 glass-panel text-center space-y-8 border-2 border-[var(--glass-border)] shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Let&apos;s Build Together
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to elevate your engineering, data, or AI initiatives?
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted-text)] leading-relaxed">
              Whether you need enterprise RAG pipelines, dashboard automation, security hardening, or team masterclasses—let&apos;s turn your vision into production reality.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base glass-panel glass-panel-hover text-[var(--foreground)]"
            >
              <MessageSquare className="w-5 h-5 text-[var(--secondary)]" />
              <span>Review Services</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-[var(--glass-border)] max-w-md mx-auto text-xs text-[var(--subtle-text)]">
            ⚡ Typical inquiry response time is within 24 hours. NDAs honored on request.
          </div>

        </div>
      </div>
    </section>
  );
}
