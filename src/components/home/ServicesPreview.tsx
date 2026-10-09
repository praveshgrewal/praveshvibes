import React from 'react';
import Link from 'next/link';
import { Service } from '@/types';
import { 
  BarChart3, 
  Cpu, 
  Sparkles, 
  Code2, 
  ShieldAlert, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Send
} from 'lucide-react';

interface ServicesPreviewProps {
  services: Service[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3,
  Cpu,
  Sparkles,
  Code2,
  ShieldAlert,
  GraduationCap
};

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
            Freelance &amp; Enterprise Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Tailored Engineering &amp; Advisory Services
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-text)]">
            Partner with a hands-on technical lead for modern software architectures, data pipelines, and intelligent AI integrations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon_name] || Sparkles;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="group rounded-3xl p-7 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Turnaround */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.turnaround && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--subtle-text)] bg-[var(--surface-alt)] px-2.5 py-1 rounded-full border border-[var(--glass-border)]">
                        <Clock className="w-3 h-3" />
                        {service.turnaround}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-5">
                    {service.short_desc}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                      Key Deliverables:
                    </p>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--muted-text)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-green)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-[var(--glass-border)]">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs transition-all"
                  >
                    <span>Request Proposal</span>
                    <Send className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl glass-panel text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-lg font-bold text-[var(--foreground)]">Have a custom challenge or enterprise RFP?</h4>
            <p className="text-sm text-[var(--muted-text)]">Let&apos;s schedule a 30-minute discovery call to evaluate architecture and feasibility.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-2xl text-sm font-bold bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all shrink-0"
          >
            Schedule Discovery
          </Link>
        </div>

      </div>
    </section>
  );
}
