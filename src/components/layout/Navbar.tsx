'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../theme/ThemeToggle';
import { 
  Menu, 
  X, 
  Code, 
  BookOpen, 
  Briefcase, 
  FileText, 
  User, 
  Mail, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/blog', label: 'Blog', icon: FileText },
  { href: '/resources', label: 'Student Notes', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[var(--foreground)]"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--primary)] via-[var(--secondary)] to-[var(--accent-pink)] p-[2px] shadow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[var(--card-bg)] rounded-[10px] flex items-center justify-center">
                <span className="gradient-text font-black text-lg">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-lg font-black tracking-tight">
                Pravesh<span className="text-[var(--secondary)]">Vibes</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-[var(--subtle-text)] mt-0.5">
                Tech & AI Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--glass-bg)] px-3 py-1.5 rounded-2xl border border-[var(--glass-border)] backdrop-blur-md shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--primary)] text-white shadow-xs'
                      : 'text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-[var(--surface-alt)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* Admin shortcut */}
            <Link
              href="/admin"
              aria-label="Admin Portal"
              title="Admin Portal"
              className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 glass-panel hover:scale-105 text-[var(--muted-text)] hover:text-[var(--primary)] ${
                isAdmin ? 'ring-2 ring-[var(--primary)] text-[var(--primary)]' : ''
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl glass-panel text-[var(--foreground)] focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] p-4 bg-[var(--card-bg)]/95 backdrop-blur-2xl border-b border-[var(--glass-border)] shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-1.5 max-w-md mx-auto">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--muted-text)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[var(--glass-border)] mt-2 flex justify-between items-center">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-sm text-[var(--muted-text)] hover:text-[var(--primary)] px-4 py-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-sm"
              >
                Hire Me
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
