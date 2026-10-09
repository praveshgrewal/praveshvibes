'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal } from 'lucide-react';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-[var(--foreground)] space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--foreground)] mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return (
              <h2 id={id} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-8 mb-4 border-b border-[var(--glass-border)] pb-2 scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return (
              <h3 id={id} className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] mt-6 mb-3 scroll-mt-24">
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-base sm:text-lg leading-relaxed text-[var(--foreground)] opacity-90 my-3 font-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 my-4 text-[var(--foreground)] opacity-90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 my-4 text-[var(--foreground)] opacity-90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base sm:text-lg leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--primary)] pl-4 py-1 italic my-4 bg-[var(--surface-alt)]/50 rounded-r-xl">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !children?.toString().includes('\n');
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded-md text-sm font-mono bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--glass-border)]">
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock language={match ? match[1] : 'text'} code={codeString} />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[#0A0E1A] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10162A] border-b border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--secondary)]" />
          <span className="font-mono uppercase font-semibold text-[11px] tracking-wider text-[var(--secondary)]">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 transition-colors text-[11px] font-medium cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
