import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ExpertiseSection } from '@/components/home/ExpertiseSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { LatestBlog } from '@/components/home/LatestBlog';
import { PopularResources } from '@/components/home/PopularResources';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { ContactCTA } from '@/components/home/ContactCTA';
import { 
  getSiteSettings, 
  getProjects, 
  getServices, 
  getBlogPosts, 
  getResources 
} from '@/lib/data/store';

export default async function HomePage() {
  const [settings, projects, services, blogPosts, resources] = await Promise.all([
    getSiteSettings(),
    getProjects(true),
    getServices(true),
    getBlogPosts(true),
    getResources(true)
  ]);

  return (
    <div className="flex flex-col w-full">
      <Hero settings={settings} />
      <ExpertiseSection />
      <FeaturedProjects projects={projects} />
      <ServicesPreview services={services} />
      <LatestBlog posts={blogPosts} />
      <PopularResources resources={resources} />
      <ExperienceTimeline />
      <ContactCTA />
    </div>
  );
}
