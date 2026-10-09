'use client';

import React, { useEffect, useState } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data/store';
import { SiteSettings } from '@/types';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  User, 
  Mail, 
  MapPin, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await updateSiteSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!settings) {
    return (
      <div className="p-8 text-center text-xs text-[var(--muted-text)]">
        Loading site configuration...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
          System Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
          Profile &amp; Website Settings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-text)]">
          Customize your real public profile, contact details, social links, and availability badge.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile and site settings successfully saved! Changes take effect immediately across all pages.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-panel space-y-8">
        
        {/* Core Identity */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--primary)]" />
            <span>Public Identity &amp; Headline</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Full Name</label>
              <input
                type="text"
                required
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Brand Tagline</label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--subtle-text)]">Professional Bio (About section)</label>
            <textarea
              rows={3}
              required
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)] flex items-center justify-between">
                <span>Avatar Photo URL (Close-up)</span>
                {settings.avatar_url && (
                  <span className="text-[10px] text-[var(--secondary)] font-normal">Active</span>
                )}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  required
                  value={settings.avatar_url}
                  onChange={(e) => setSettings({ ...settings, avatar_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
                {settings.avatar_url && (
                  <img
                    src={settings.avatar_url}
                    alt="Avatar preview"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[var(--glass-border)]"
                  />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)] flex items-center justify-between">
                <span>About Portrait URL (Full/Standing)</span>
                {settings.portrait_url && (
                  <span className="text-[10px] text-[var(--secondary)] font-normal">Active</span>
                )}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={settings.portrait_url || ''}
                  placeholder="/images/pravesh-portrait.png"
                  onChange={(e) => setSettings({ ...settings, portrait_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
                {settings.portrait_url && (
                  <img
                    src={settings.portrait_url}
                    alt="Portrait preview"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[var(--glass-border)]"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--subtle-text)]">Contact Email</label>
            <input
              type="email"
              required
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Location</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Years of Experience</label>
              <input
                type="number"
                value={settings.years_experience || 5}
                onChange={(e) => setSettings({ ...settings, years_experience: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Students Trained Metric</label>
              <input
                type="text"
                value={settings.students_trained_estimate || '1,500+'}
                onChange={(e) => setSettings({ ...settings, students_trained_estimate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social URLs */}
        <div className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-[var(--secondary)]" />
            <span>Social Profile URLs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">GitHub Profile</label>
              <input
                type="url"
                value={settings.github_url}
                onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">LinkedIn Profile</label>
              <input
                type="url"
                value={settings.linkedin_url}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">Twitter / X Profile</label>
              <input
                type="url"
                value={settings.twitter_url}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--subtle-text)]">YouTube Channel</label>
              <input
                type="url"
                value={settings.youtube_url}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status Toggle & Submit */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--glass-border)]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.available_for_hire}
              onChange={(e) => setSettings({ ...settings, available_for_hire: e.target.checked })}
              className="w-4 h-4 rounded text-[var(--primary)] cursor-pointer"
            />
            <span className="text-xs font-bold text-[var(--foreground)]">
              Show &quot;Available for select freelance &amp; corporate training&quot; public badge
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
