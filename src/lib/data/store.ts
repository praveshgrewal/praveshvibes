import {
  BlogPost,
  Project,
  Resource,
  Service,
  SiteSettings,
  ContactInquiry,
  Testimonial,
  StatsOverview
} from '@/types';
import {
  initialSiteSettings,
  initialProjects,
  initialBlogPosts,
  initialResources,
  initialServices,
  initialTestimonials
} from './initial-data';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

const STORAGE_KEYS = {
  SETTINGS: 'praveshvibes_settings',
  PROJECTS: 'praveshvibes_projects',
  BLOG: 'praveshvibes_blog',
  RESOURCES: 'praveshvibes_resources',
  SERVICES: 'praveshvibes_services',
  INQUIRIES: 'praveshvibes_inquiries',
  TESTIMONIALS: 'praveshvibes_testimonials'
};

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set localStorage', err);
  }
}

// Initial inquiries sample
const sampleInquiries: ContactInquiry[] = [
  {
    id: "inq-1",
    name: "Alex Vance",
    email: "alex@techventure.io",
    subject: "Enterprise RAG Pipeline Consultation",
    service_category: "AI & Generative AI Applications",
    message: "Hi Pravesh, we are looking to build a private RAG pipeline on top of our engineering documentation. Would love to discuss scope, timeline, and deliverables.",
    status: "new",
    created_at: "2026-10-01T10:00:00Z"
  },
  {
    id: "inq-2",
    name: "Priya Nair",
    email: "priya.nair@analyticsfirm.com",
    subject: "Power BI Executive Dashboard Setup",
    service_category: "Data Analytics & Dashboards",
    message: "We need automated ETL from Snowflake into clean executive Power BI reports for our Q3 board meeting.",
    status: "replied",
    created_at: "2026-09-28T14:30:00Z"
  }
];

// --- SETTINGS ---
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) return data;
    } catch {
      // Fallback
    }
  }

  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const file = path.join(process.cwd(), 'data', 'settings.json');
      if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {
      // fallback to initialSiteSettings
    }
    return initialSiteSettings;
  }

  const stored = getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  if (stored) {
    let changed = false;
    const updated = { ...stored };

    // Migrate from old unsplash avatar
    if (stored.avatar_url && stored.avatar_url.includes('images.unsplash.com/photo-1534528741775-53994a69daeb')) {
      updated.avatar_url = initialSiteSettings.avatar_url;
      changed = true;
    }
    if (!stored.portrait_url) {
      updated.portrait_url = initialSiteSettings.portrait_url;
      changed = true;
    }
    // Migrate default github if still generic
    if (stored.github_url === 'https://github.com') {
      updated.github_url = initialSiteSettings.github_url;
      changed = true;
    }
    if (stored.linkedin_url === 'https://linkedin.com') {
      updated.linkedin_url = initialSiteSettings.linkedin_url;
      changed = true;
    }

    if (changed) {
      setLocal(STORAGE_KEYS.SETTINGS, updated);
      return updated;
    }
  }
  return stored;
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('site_settings').upsert({ id: 'primary', ...settings });
    } catch (e) {
      console.warn('Supabase update failed, fallback to local', e);
    }
  }

  if (typeof window !== 'undefined') {
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch (e) {
      console.warn('Failed to sync settings with server API', e);
    }
  } else {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const dir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'settings.json'), JSON.stringify(settings, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Failed to write settings file on server', e);
    }
  }

  return settings;
}

// --- PROJECTS ---
export async function getProjects(onlyPublished = true): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (onlyPublished) query = query.eq('published', true);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  const all = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  return onlyPublished ? all.filter(p => p.published) : all;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects(false);
  return all.find(p => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('projects').upsert(project);
    } catch (e) {
      console.warn('Supabase upsert failed', e);
    }
  }
  const all = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  const index = all.findIndex(p => p.id === project.id);
  let updated: Project[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = project;
  } else {
    updated = [project, ...all];
  }
  setLocal(STORAGE_KEYS.PROJECTS, updated);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  setLocal(STORAGE_KEYS.PROJECTS, all.filter(p => p.id !== id));
}

// --- BLOG POSTS ---
export async function getBlogPosts(onlyPublished = true): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (onlyPublished) query = query.eq('published', true);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  const all = getLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  return onlyPublished ? all.filter(b => b.published) : all;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts(false);
  return all.find(b => b.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('blog_posts').upsert(post);
    } catch (e) {
      console.warn('Supabase upsert failed', e);
    }
  }
  const all = getLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  const index = all.findIndex(b => b.id === post.id);
  let updated: BlogPost[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = post;
  } else {
    updated = [post, ...all];
  }
  setLocal(STORAGE_KEYS.BLOG, updated);
  return post;
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('blog_posts').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  setLocal(STORAGE_KEYS.BLOG, all.filter(b => b.id !== id));
}

// --- RESOURCES ---
export async function getResources(onlyPublished = true): Promise<Resource[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('resources').select('*').order('created_at', { ascending: false });
      if (onlyPublished) query = query.eq('published', true);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  const all = getLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  return onlyPublished ? all.filter(r => r.published) : all;
}

export async function saveResource(res: Resource): Promise<Resource> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('resources').upsert(res);
    } catch (e) {
      console.warn('Supabase upsert failed', e);
    }
  }
  const all = getLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  const index = all.findIndex(r => r.id === res.id);
  let updated: Resource[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = res;
  } else {
    updated = [res, ...all];
  }
  setLocal(STORAGE_KEYS.RESOURCES, updated);
  return res;
}

export async function deleteResource(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('resources').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  setLocal(STORAGE_KEYS.RESOURCES, all.filter(r => r.id !== id));
}

export async function incrementResourceDownload(id: string): Promise<void> {
  const all = getLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  const updated = all.map(r => r.id === id ? { ...r, download_count: r.download_count + 1 } : r);
  setLocal(STORAGE_KEYS.RESOURCES, updated);
}

// --- SERVICES ---
export async function getServices(onlyActive = true): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('services').select('*').order('order_index', { ascending: true });
      if (onlyActive) query = query.eq('active', true);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fallback
    }
  }
  const all = getLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  return onlyActive ? all.filter(s => s.active) : all;
}

export async function saveService(service: Service): Promise<Service> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('services').upsert(service);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  const index = all.findIndex(s => s.id === service.id);
  let updated: Service[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = service;
  } else {
    updated = [...all, service];
  }
  setLocal(STORAGE_KEYS.SERVICES, updated);
  return service;
}

export async function deleteService(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('services').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  setLocal(STORAGE_KEYS.SERVICES, all.filter(s => s.id !== id));
}

// --- CONTACT INQUIRIES ---
export async function getInquiries(): Promise<ContactInquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch {
      // Fallback
    }
  }
  return getLocal<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, sampleInquiries);
}

export async function saveInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>): Promise<ContactInquiry> {
  const newRecord: ContactInquiry = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('contact_inquiries').insert([newRecord]);
    } catch (e) {
      console.warn('Failed to insert inquiry to Supabase', e);
    }
  }

  const all = getLocal<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, sampleInquiries);
  setLocal(STORAGE_KEYS.INQUIRIES, [newRecord, ...all]);
  return newRecord;
}

export async function updateInquiryStatus(id: string, status: ContactInquiry['status']): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('contact_inquiries').update({ status }).eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, sampleInquiries);
  const updated = all.map(inq => inq.id === id ? { ...inq, status } : inq);
  setLocal(STORAGE_KEYS.INQUIRIES, updated);
}

export async function deleteInquiry(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('contact_inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  const all = getLocal<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, sampleInquiries);
  setLocal(STORAGE_KEYS.INQUIRIES, all.filter(inq => inq.id !== id));
}

// --- TESTIMONIALS ---
export async function getTestimonials(): Promise<Testimonial[]> {
  return getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
}

// --- STATS OVERVIEW ---
export async function getStatsOverview(): Promise<StatsOverview> {
  const projects = await getProjects(false);
  const articles = await getBlogPosts(false);
  const resources = await getResources(false);
  const inquiries = await getInquiries();

  return {
    totalProjects: projects.length,
    totalArticles: articles.length,
    totalResources: resources.length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'new').length
  };
}
