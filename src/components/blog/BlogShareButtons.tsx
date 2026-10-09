'use client';

import React, { useState } from 'react';
import { LinkedinIcon } from '@/components/ui/SocialIcons';
import { Link as LinkIcon, Check, Share2 } from 'lucide-react';

interface BlogShareButtonsProps {
  title: string;
  slug: string;
}

export function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://praveshvibes.com/blog/${slug}`;
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-[var(--subtle-text)] hidden sm:inline">Share:</span>

      <button
        type="button"
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[#0077B5] transition-colors cursor-pointer"
        title="Share on LinkedIn"
      >
        <LinkedinIcon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy article link"
        className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors cursor-pointer"
        title="Copy Link"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <LinkIcon className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
