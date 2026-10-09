export type ProjectCategory = 
  | 'AI/ML' 
  | 'Data Analytics' 
  | 'Cybersecurity' 
  | 'Web Development' 
  | 'Cloud & DevOps';

export type ResourceCategory = 
  | 'Python' 
  | 'SQL' 
  | 'Excel & Power BI' 
  | 'Machine Learning' 
  | 'Deep Learning' 
  | 'Generative AI' 
  | 'Linux & Cloud' 
  | 'Cybersecurity';

export type ResourceDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ResourceFileType = 'PDF' | 'Cheat Sheet' | 'Jupyter Notebook' | 'Guide';

export interface SiteSettings {
  id?: string;
  name: string;
  tagline: string;
  bio: string;
  avatar_url: string;
  portrait_url?: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  twitter_url?: string;
  youtube_url?: string;
  location: string;
  available_for_hire: boolean;
  years_experience?: number;
  students_trained_estimate?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover_image: string;
  reading_time: string;
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  seo_title?: string;
  seo_description?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  problem: string;
  approach: string;
  solution: string;
  results: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  cover_image: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon_name: string;
  short_desc: string;
  full_desc: string;
  deliverables: string[];
  pricing_note?: string;
  turnaround?: string;
  active: boolean;
  order_index?: number;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ResourceCategory;
  difficulty: ResourceDifficulty;
  file_type: ResourceFileType;
  file_url: string;
  file_size: string;
  tags: string[];
  download_count: number;
  published: boolean;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  service_category: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string;
  rating: number;
  published: boolean;
}

export interface StatsOverview {
  totalProjects: number;
  totalArticles: number;
  totalResources: number;
  totalInquiries: number;
  newInquiries: number;
}
