'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SERVICE_OPTIONS = [
  'Data Analytics & Dashboards',
  'Data Science & Predictive ML',
  'AI & Generative AI Applications (RAG)',
  'Full-Stack Web Development',
  'Cybersecurity & Security Audits',
  'Corporate Training & Workshops',
  'Student Mentorship / Other'
];

export function ContactForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service_category: SERVICE_OPTIONS[0],
    message: '',
    honeypot: '' // spam trap
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-populate from URL query params if present
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const subjectParam = searchParams.get('subject');

    if (serviceParam) {
      const match = SERVICE_OPTIONS.find(
        (s) => s.toLowerCase().includes(serviceParam.toLowerCase()) || serviceParam.toLowerCase().includes(s.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service_category: match }));
      }
    }

    if (subjectParam) {
      setFormData((prev) => ({ ...prev, subject: subjectParam }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject line.');
      return;
    }
    if (formData.message.trim().length < 10) {
      setErrorMessage('Please provide at least 10 characters in your message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccess(true);
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      service_category: SERVICE_OPTIONS[0],
      message: '',
      honeypot: ''
    });
    setSuccess(false);
    setErrorMessage(null);
  };

  if (success) {
    return (
      <div className="p-10 rounded-3xl glass-panel text-center space-y-6 border border-emerald-500/30">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[var(--foreground)]">Message Received!</h3>
          <p className="text-sm sm:text-base text-[var(--muted-text)] max-w-md mx-auto leading-relaxed">
            Thank you for reaching out, <strong className="text-[var(--foreground)]">{formData.name}</strong>. Your inquiry has been securely routed. Pravesh typically responds within 24 hours.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl glass-panel space-y-6 relative">
      
      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="e.g. alex@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>
      </div>

      {/* Row: Subject and Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-category" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Inquiry Track
          </label>
          <select
            id="contact-category"
            value={formData.service_category}
            onChange={(e) => setFormData({ ...formData, service_category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all cursor-pointer"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[var(--card-bg)] text-[var(--foreground)]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Subject Line <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            required
            placeholder="e.g. Enterprise RAG Pipeline Architecture"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Project Context or Message <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-[var(--subtle-text)]">
            {formData.message.length} / 5000 chars
          </span>
        </div>
        <textarea
          id="contact-message"
          rows={5}
          required
          maxLength={5000}
          placeholder="Describe your current tech stack, pain points, target deliverables, or student questions..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent-pink)] text-white hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Secure Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Direct Inquiry</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-[var(--subtle-text)]">
        🔒 All inquiries are encrypted and handled confidentially under strict privacy protocols.
      </p>

    </form>
  );
}
