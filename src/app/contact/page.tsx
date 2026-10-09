import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { getSiteSettings } from '@/lib/data/store';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '@/components/ui/SocialIcons';

export const metadata: Metadata = {
  title: 'Contact & Project Inquiries',
  description: 'Reach out to Pravesh Grewal for freelance AI engineering, data analytics, cybersecurity audits, corporate workshops, or student mentorship.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--glass-border)]">
          <Sparkles className="w-3.5 h-3.5" />
          Start a Conversation
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Let&apos;s Build What&apos;s Next Together
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text)]">
          Have an engineering challenge, an upcoming corporate masterclass, or questions about study notes? Send a message and let&apos;s connect.
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Contact Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl glass-panel space-y-6">
            <h2 className="text-xl font-bold text-[var(--foreground)]">Direct Communications</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Primary Email</p>
                  <a href={`mailto:${settings.email}`} className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--secondary)] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Location &amp; Scope</p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {settings.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent-green)] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Turnaround Target</p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Within 24 Hours (Mon — Sat)
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-[var(--glass-border)] space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                Connect on Social Networks:
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={settings.github_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[#0077B5] hover:border-[#0077B5] transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter/X"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-all"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-red-500 hover:border-red-500 transition-all"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Reassurance banner */}
          <div className="p-6 rounded-3xl glass-panel space-y-3 border-l-4 border-l-[var(--secondary)]">
            <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--secondary)]" />
              <span>Confidentiality &amp; Respect</span>
            </h3>
            <p className="text-xs text-[var(--muted-text)] leading-relaxed">
              We never share email addresses or contact details. Project ideas, preliminary architectures, and data samples are protected under confidential handling principles.
            </p>
          </div>

        </div>

        {/* Right Form (7 cols) */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-12 rounded-3xl glass-panel text-center text-sm text-[var(--muted-text)]">Loading contact interface...</div>}>
            <ContactForm />
          </Suspense>
        </div>

      </div>

    </div>
  );
}
