'use client';

import React, { useState, useMemo } from 'react';
import { Resource, ResourceCategory, ResourceDifficulty, ResourceFileType } from '@/types';
import { 
  Search, 
  FileDown, 
  DownloadCloud, 
  BookOpen, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Layers
} from 'lucide-react';
import { incrementResourceDownload } from '@/lib/data/store';
import confetti from 'canvas-confetti';

const CATEGORIES: ('All' | ResourceCategory)[] = [
  'All',
  'Python',
  'SQL',
  'Excel & Power BI',
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Linux & Cloud',
  'Cybersecurity'
];

const DIFFICULTIES: ('All' | ResourceDifficulty)[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const FILE_TYPES: ('All' | ResourceFileType)[] = ['All', 'PDF', 'Cheat Sheet', 'Jupyter Notebook', 'Guide'];

export function ResourcesClient({ initialResources }: { initialResources: Resource[] }) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ResourceCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | ResourceDifficulty>('All');
  const [selectedFileType, setSelectedFileType] = useState<'All' | ResourceFileType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return initialResources.filter((res) => {
      const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'All' || res.difficulty === selectedDifficulty;
      const matchesType = selectedFileType === 'All' || res.file_type === selectedFileType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesDiff && matchesType && matchesSearch;
    });
  }, [initialResources, selectedCategory, selectedDifficulty, selectedFileType, searchQuery]);

  const handleDownload = async (resource: Resource) => {
    setDownloadingId(resource.id);
    await incrementResourceDownload(resource.id);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setDownloadingId(null);
      // Generate clean student notes file download
      const content = `=====================================================
PRAVESHVIBES LEARNING REPOSITORY - STUDENT STUDY NOTE
=====================================================
Title: ${resource.title}
Category: ${resource.category}
Difficulty: ${resource.difficulty}
Format: ${resource.file_type}
Tags: ${resource.tags.join(', ')}

Description:
${resource.description}

Key Learning Modules:
- Core Foundations & Theoretical Intuition
- Step-by-Step Practical Code Workflows
- Common Industry Interview Questions & Answers
- High-Performance Production Tips & Best Practices

=====================================================
Access more free notes, code templates & cheat sheets:
https://praveshvibes.com/resources
Brand: PraveshVibes — "I Teach Technology. I Build What's Next."
=====================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.slug}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 600);
  };

  return (
    <div className="space-y-10">
      
      {/* Filters Bar */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[var(--subtle-text)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes, topics (e.g. Pandas, CTEs, RAG, Wireshark)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm sm:text-base bg-[var(--surface-alt)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--subtle-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">
            Subject Track:
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-alt)] text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--glass-border)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters: Difficulty & File Type */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--glass-border)]">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Difficulty:</span>
            <div className="flex gap-1.5">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-[var(--foreground)] text-[var(--background)]'
                      : 'bg-[var(--surface-alt)] text-[var(--subtle-text)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text)]">Format:</span>
            <div className="flex gap-1.5">
              {FILE_TYPES.map((ft) => (
                <button
                  key={ft}
                  onClick={() => setSelectedFileType(ft)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedFileType === ft
                      ? 'bg-[var(--secondary)] text-black font-bold'
                      : 'bg-[var(--surface-alt)] text-[var(--subtle-text)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {ft}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[var(--subtle-text)] px-1">
        <span>Showing {filteredResources.length} of {initialResources.length} learning resources</span>
        {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedFileType !== 'All') && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedFileType('All');
              setSearchQuery('');
            }}
            className="text-[var(--primary)] hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[var(--subtle-text)] mx-auto opacity-50" />
          <h3 className="text-xl font-bold text-[var(--foreground)]">No resources found</h3>
          <p className="text-sm text-[var(--muted-text)]">Try selecting another subject or clearing your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-7 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                {/* Meta Top Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--glass-border)]">
                    {res.category}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-[var(--subtle-text)]">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] font-medium">
                      {res.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface-alt)] border border-[var(--glass-border)] font-semibold text-[var(--foreground)]">
                      {res.file_type}
                    </span>
                    <span>•</span>
                    <span>{res.file_size}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                  {res.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-6">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-alt)] text-[var(--subtle-text)] border border-[var(--glass-border)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--subtle-text)] flex items-center gap-1.5">
                  <DownloadCloud className="w-4 h-4 text-[var(--secondary)]" />
                  <span>{res.download_count.toLocaleString()} downloads</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleDownload(res)}
                  disabled={downloadingId === res.id}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-95 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{downloadingId === res.id ? 'Generating...' : 'Download Note'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
