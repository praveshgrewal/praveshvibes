-- ====================================================================
-- MASTER DATABASE SCHEMA: PRAVESHVIBES
-- PostgreSQL / Supabase Schema with Row Level Security (RLS) Policies
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SITE SETTINGS & PROFILE
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    name TEXT NOT NULL DEFAULT 'Pravesh Grewal',
    tagline TEXT NOT NULL DEFAULT 'I Teach Technology. I Build What''s Next.',
    bio TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    email TEXT NOT NULL,
    github_url TEXT DEFAULT 'https://github.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    twitter_url TEXT DEFAULT 'https://twitter.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    location TEXT DEFAULT 'New Delhi, India',
    available_for_hire BOOLEAN DEFAULT true,
    years_experience INT DEFAULT 5,
    students_trained_estimate TEXT DEFAULT '1,500+',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES & TAGS
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    cover_image TEXT NOT NULL,
    reading_time TEXT DEFAULT '5 min read',
    published BOOLEAN DEFAULT false,
    views INT DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at DESC);

-- 5. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    problem TEXT NOT NULL,
    approach TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    cover_image TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);

-- 6. SERVICES
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon_name TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    pricing_note TEXT,
    turnaround TEXT,
    active BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0
);

-- 7. STUDENT RESOURCES & NOTES
CREATE TABLE IF NOT EXISTS resources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    download_count INT DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_published ON resources(published);

-- 8. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    rating INT DEFAULT 5,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CONTACT INQUIRIES
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    service_category TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON contact_inquiries(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- SITE SETTINGS
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

CREATE POLICY "Admins can update site settings"
    ON site_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- BLOG POSTS
CREATE POLICY "Public can view published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

CREATE POLICY "Admins can view and manage all blog posts"
    ON blog_posts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- PROJECTS
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = true);

CREATE POLICY "Admins can view and manage all projects"
    ON projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- SERVICES
CREATE POLICY "Public can view active services"
    ON services FOR SELECT
    USING (active = true);

CREATE POLICY "Admins can view and manage all services"
    ON services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- RESOURCES
CREATE POLICY "Public can view published resources"
    ON resources FOR SELECT
    USING (published = true);

CREATE POLICY "Admins can view and manage all resources"
    ON resources FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- TESTIMONIALS
CREATE POLICY "Public can view published testimonials"
    ON testimonials FOR SELECT
    USING (published = true);

CREATE POLICY "Admins can manage testimonials"
    ON testimonials FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- CONTACT INQUIRIES
CREATE POLICY "Public can insert contact inquiries"
    ON contact_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view and update contact inquiries"
    ON contact_inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- STORAGE BUCKETS SETUP & SECURITY POLICIES
-- ====================================================================
-- Run the following in Supabase SQL editor:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true) ON CONFLICT DO NOTHING;
