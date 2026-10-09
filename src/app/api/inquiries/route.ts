import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ContactInquiry } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function readLocalInquiries(): ContactInquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed reading inquiries file', err);
  }
  return [];
}

function writeLocalInquiries(inquiries: ContactInquiry[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing inquiries file', err);
  }
}

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return NextResponse.json(data);
      }
    } catch (e) {
      console.warn('Supabase inquiries fetch error:', e);
    }
  }

  const list = readLocalInquiries();
  return NextResponse.json(list);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.from('contact_inquiries').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('Supabase status update failed', e);
      }
    }

    const list = readLocalInquiries();
    const updated = list.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    writeLocalInquiries(updated);

    return NextResponse.json({ success: true, updated: updated.find(i => i.id === id) });
  } catch (err) {
    console.error('Failed to update inquiry status', err);
    return NextResponse.json({ error: 'Failed to update inquiry status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // ignore
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing inquiry id' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.from('contact_inquiries').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase delete failed', e);
      }
    }

    const list = readLocalInquiries();
    const filtered = list.filter((inq) => inq.id !== id);
    writeLocalInquiries(filtered);

    return NextResponse.json({ success: true, remaining: filtered.length });
  } catch (err) {
    console.error('Failed to delete inquiry', err);
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
