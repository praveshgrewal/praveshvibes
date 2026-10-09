import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/data/store';
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
  HelpCircle,
  Send,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Freelancing Services & Technical Consulting',
  description: 'Bespoke freelance engineering and training services across AI/ML, Generative AI & RAG, Data Analytics, Cybersecurity assessments, and Web Development.',
};

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3,
  Cpu,
  Sparkles,
  Code2,
  ShieldAlert,
  GraduationCap
};

const FAQS = [
  {
    q: "How are project timelines and scopes determined?",
    a: "Every engagement begins with a 30-minute discovery consultation to define clear acceptance criteria, data architectures, and deliverables. Detailed milestones and turnaround estimates are documented before code begins."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes, standard mutual NDAs are signed before reviewing sensitive proprietary company data, codebase repositories, or system architecture diagrams."
  },
  {
    q: "What is your pricing model?",
    a: "We accommodate both fixed-deliverable milestones (ideal for defined MVPs and dashboards) and weekly engineering retainers for continuous advisory, RAG optimizations, and corporate training cohorts."
  },
  {
    q: "How do you handle corporate training workshops?",
    a: "Corporate workshops are tailored specifically to your engineering stack. Sessions feature interactive slides, live coding, and complete GitHub repository access with student cheat sheets."
  }
];

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
          <Sparkles className="w-3.5 h-3.5" />
          Engineering &amp; Advisory Practice
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Freelancing &amp; Technical Services
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text)]">
          High-velocity, production-tested execution across Generative AI, automated data analytics, full-stack software development, and cybersecurity defense.
        </p>
      </div>

      {/* Services Detailed List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = ICON_MAP[service.icon_name] || Sparkles;
          return (
            <div
              key={service.id}
              id={service.slug}
              className="p-8 sm:p-10 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  {service.turnaround && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--subtle-text)] bg-[var(--surface-alt)] px-3 py-1 rounded-full border border-[var(--glass-border)]">
                      <Clock className="w-3.5 h-3.5" />
                      {service.turnaround}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                    {service.full_desc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                    Standard Scope &amp; Deliverables:
                  </h3>
                  <div className="space-y-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted-text)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Note */}
                {service.pricing_note && (
                  <div className="p-3.5 rounded-xl bg-[var(--surface-alt)]/60 border border-[var(--glass-border)] text-xs text-[var(--subtle-text)] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                    <span>{service.pricing_note}</span>
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="pt-6 border-t border-[var(--glass-border)] flex items-center justify-between">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-xs transition-all"
                >
                  <span>Request Proposal for {service.title}</span>
                  <Send className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engagement Workflow */}
      <section className="p-8 sm:p-12 rounded-3xl glass-panel space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Execution Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--foreground)]">
            How We Partner With You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-2">
            <span className="text-xs font-bold text-[var(--secondary)]">STEP 01</span>
            <h3 className="text-base font-bold text-[var(--foreground)]">Discovery Call</h3>
            <p className="text-xs text-[var(--muted-text)] leading-relaxed">
              We dissect technical constraints, data schemas, requirements, and target timeline in depth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-2">
            <span className="text-xs font-bold text-[var(--primary)]">STEP 02</span>
            <h3 className="text-base font-bold text-[var(--foreground)]">Proposal &amp; Architecture</h3>
            <p className="text-xs text-[var(--muted-text)] leading-relaxed">
              Receive a detailed milestone roadmap, technical stack specifications, and fixed timeline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-2">
            <span className="text-xs font-bold text-[var(--accent-pink)]">STEP 03</span>
            <h3 className="text-base font-bold text-[var(--foreground)]">Iterative Sprints</h3>
            <p className="text-xs text-[var(--muted-text)] leading-relaxed">
              Continuous deployment, shared preview environments, and transparent progress updates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-alt)] border border-[var(--glass-border)] space-y-2">
            <span className="text-xs font-bold text-[var(--accent-green)]">STEP 04</span>
            <h3 className="text-base font-bold text-[var(--foreground)]">Handover &amp; Training</h3>
            <p className="text-xs text-[var(--muted-text)] leading-relaxed">
              Complete source code, documentation dictionaries, and live team walkthrough sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
            Clear Expectations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--foreground)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel space-y-2">
              <h3 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-[var(--muted-text)] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="p-10 rounded-3xl glass-panel text-center max-w-3xl mx-auto space-y-6 border-2 border-[var(--glass-border)]">
        <h3 className="text-2xl font-black text-[var(--foreground)]">Have an upcoming project or initiative?</h3>
        <p className="text-sm text-[var(--muted-text)]">Submit your requirements and receive a structured architecture review within 24 hours.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 transition-all shadow-md"
        >
          <span>Open Inquiry Form</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
