import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { initialSiteSettings } from '@/lib/data/initial-data';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';
import { SiteSettings } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }
  }

  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return NextResponse.json(parsed);
    }
  } catch (err) {
    console.error('Failed reading settings file', err);
  }

  return NextResponse.json(initialSiteSettings);
}

export async function POST(request: Request) {
  try {
    const body: SiteSettings = await request.json();

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Save to disk
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(body, null, 2), 'utf-8');

    // Also persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.from('site_settings').upsert({ id: 'primary', ...body });
      } catch (err) {
        console.warn('Supabase upsert failed', err);
      }
    }

    // Revalidate paths so server-rendered pages get updated data
    try {
      revalidatePath('/', 'layout');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, settings: body });
  } catch (err) {
    console.error('Failed to update settings', err);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
