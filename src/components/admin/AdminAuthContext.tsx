'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'praveshvibes_admin_session';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      // 1. Check Supabase Auth if configured
      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              email: session.user.email || 'admin@praveshvibes.com',
              role: 'admin'
            });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Supabase session check error', e);
        }
      }

      // 2. Local fallback session check
      try {
        const local = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          setUser(parsed);
        }
      } catch {
        // Ignore
      }
      setLoading(false);
    }

    checkAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Try Supabase Auth if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.session) {
          const adminUser = { email: data.session.user.email || email, role: 'admin' };
          setUser(adminUser);
          localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Supabase authentication failed' };
      }
    }

    // 2. Fallback local credentials for development & evaluation
    // Demo admin credentials: admin@praveshvibes.com / admin123
    if (
      (email.toLowerCase() === 'admin@praveshvibes.com' && pass === 'admin123') ||
      (email.toLowerCase() === 'pravesh@praveshvibes.com' && pass === 'pravesh123')
    ) {
      const adminUser = { email, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid administrator credentials. For local preview, use admin@praveshvibes.com and admin123.' };
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // Ignore
      }
    }
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
