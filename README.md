# PraveshVibes — Official Personal Brand & Platform

> **"I Teach Technology. I Build What's Next."**

**PraveshVibes** is a production-oriented personal brand website combining a modern 3D portfolio, freelancing services platform, technical blogging CMS, student notes and resources repository, and secure administrator dashboard.

Designed for technology educator, data analytics/AI practitioner, and cybersecurity specialist **Pravesh Grewal**.

---

## 🚀 Key Highlights & Architecture

- **Next.js 16 App Router**: Ultra-fast SSR, SSG, and streaming architectures with React 19 and Turbopack.
- **Visual Design System**: Tailored light & dark modes with liquid glassmorphism, glowing depth effects, and zero-FOUC theme persistence in `localStorage`.
- **Interactive 3D Experience**: Custom Three.js interactive technology node lattice and orbital particle cloud with mouse parallax and smooth CSS/WebGL fallback.
- **Freelance Platform**: 6 core service offerings with deliverables checklists, timelines, and pre-populated inquiry routing.
- **Technical Blog CMS**: Markdown-powered article reader with live Table of Contents, syntax-highlighted code blocks, copy-code button, read-time calculator, and social sharing.
- **Student Learning Repository**: Multi-track downloadable notes (Python, SQL, Power BI, ML, Deep Learning, GenAI, Linux, Security) with difficulty & format filters, download tracking, and confetti feedback.
- **Secure Administrator Dashboard (`/admin`)**:
  - Protected session verification with Supabase Auth & local fallback.
  - Complete CRUD for blog posts, projects, study notes, services, and profile settings.
  - Client inquiry management with status tracking (`new`, `read`, `replied`, `archived`).
- **PostgreSQL & Supabase Ready**: Normalized database schema (`supabase/schema.sql`) with strict Row Level Security (RLS) policies.
- **Comprehensive SEO**: Dynamic `sitemap.ts`, `robots.ts`, Open Graph / Twitter Card tags, and semantic HTML5 landmarks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, CSS Variables, Liquid Glass tokens |
| **3D & Graphics** | Three.js, Canvas, WebGL, Canvas Confetti |
| **Icons & UI** | Lucide React, Custom SVG Brand Icons |
| **Markdown** | React Markdown, Remark GFM |
| **Database** | PostgreSQL / Supabase, Row Level Security (RLS) |
| **Auth & Storage** | Supabase Auth, Supabase Storage |
| **Deployment** | Vercel, GitHub Actions CI/CD |

---

## 💻 Local Quickstart

### 1. Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### 2. Clone and Install
```bash
git clone https://github.com/your-username/praveshvibes.git
cd praveshvibes
npm install
```

### 3. Environment Variables (Optional for Local Preview)
The application works immediately out-of-the-box with high-quality sample data and local persistent storage. To connect to your real Supabase project:

```bash
cp .env.example .env.local
```

Populate `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Administrator Dashboard & Bootstrap

1. Navigate to `/admin` or click the shield icon in the top navigation bar.
2. If not authenticated, you will be redirected to `/admin/login`.
3. **Local Evaluation Credentials**:
   - **Email:** `admin@praveshvibes.com`
   - **Password:** `admin123`
4. **Production Supabase Bootstrap**:
   - Create a user in your Supabase project under **Authentication > Users**.
   - Sign in with that user's email and password. All mutations will automatically write to your Supabase PostgreSQL tables!

---

## 🗄️ Supabase Database & Storage Setup

1. Create a new project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it. This creates:
   - Tables: `site_settings`, `blog_posts`, `projects`, `services`, `resources`, `testimonials`, `contact_inquiries`
   - Indexes and constraints
   - Row Level Security (RLS) policies allowing public reads and authenticated admin writes.
4. (Optional) Run [`supabase/seed.sql`](./supabase/seed.sql) to populate initial data into PostgreSQL.
5. In **Storage**, create two public buckets:
   - `media` (for blog and project cover images)
   - `resources` (for uploaded PDF handbooks and cheat sheets)

---

## 🚢 Deployment to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete production implementation of PraveshVibes"
   git branch -M main
   git remote add origin https://github.com/<your-username>/praveshvibes.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `praveshvibes` GitHub repository.
4. Add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://praveshvibes.com`)
5. Click **Deploy**. Vercel will build and launch your production site with automated edge caching and SSL!

---

## 📋 Production Verification Checklist

- [x] Responsive layout in both Light & Dark modes with zero flash.
- [x] Three.js interactive 3D hero scene with mouse follow and WebGL fallback.
- [x] Homepage with all 8 requested sections.
- [x] Full About & Expertise page covering teaching philosophy and credentials.
- [x] Projects showcase with category filtering, search, and 4-pillar case study pages.
- [x] Freelance services platform with deliverables checklists and inquiry buttons.
- [x] Technical blog CMS with Markdown rendering, Table of Contents, code copy button, and sharing.
- [x] Student notes library with multi-track filters, difficulty levels, and simulated PDF downloads.
- [x] Contact system with honeypot spam protection, validation, and inquiry persistence.
- [x] Protected Admin dashboard with metrics, full CRUD, and inquiry status updater.
- [x] PostgreSQL SQL migrations and RLS policies.
- [x] Dynamic sitemap.ts and robots.txt.
- [x] `npm run build` passes with zero errors.
# praveshvibes
