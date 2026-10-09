-- Seed data for PraveshVibes

INSERT INTO site_settings (
    id, name, tagline, bio, avatar_url, email, github_url, linkedin_url, twitter_url, youtube_url, location, available_for_hire, years_experience, students_trained_estimate
) VALUES (
    'primary',
    'Pravesh Grewal',
    'I Teach Technology. I Build What''s Next.',
    'Technology educator, Data Science & AI practitioner, and cybersecurity enthusiast dedicated to demystifying complex technical disciplines. Building high-impact digital solutions and empowering students and engineering teams globally.',
    '/images/pravesh-avatar.png',
    'contact@praveshvibes.com',
    'https://github.com',
    'https://linkedin.com',
    'https://twitter.com',
    'https://youtube.com',
    'New Delhi, India (Available Worldwide)',
    true,
    5,
    '1,500+'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, title, slug, icon_name, short_desc, full_desc, deliverables, pricing_note, turnaround, active, order_index)
VALUES 
('srv-data-analytics', 'Data Analytics & Dashboards', 'data-analytics-dashboards', 'BarChart3', 'End-to-end data pipeline design, KPI tracking, and executive dashboards built in Power BI, Tableau, and modern web frameworks.', 'Transform messy, fragmented raw operational data into pristine automated reporting architectures.', ARRAY['Custom SQL / Python ETL pipeline', 'Interactive Power BI / Tableau dashboard', 'Automated refresh scheduling', 'Documentation and training'], 'Custom quote based on scope', '1 - 3 weeks', true, 1),
('srv-data-science-ml', 'Data Science & Predictive ML', 'data-science-predictive-ml', 'Cpu', 'Custom statistical modeling, predictive algorithms, customer segmentation, and automated machine learning workflows.', 'Harness statistical rigor and supervised/unsupervised machine learning models.', ARRAY['EDA report', 'Production Python ML pipeline', 'RESTful API containerized with Docker', 'Model evaluation benchmarks'], 'Scoped upon technical review', '2 - 4 weeks', true, 2),
('srv-ai-genai', 'AI & Generative AI Applications', 'ai-generative-ai-apps', 'Sparkles', 'Bespoke Retrieval-Augmented Generation (RAG) systems, autonomous agents, and enterprise LLM integrations.', 'Supercharge your business workflows with tailored Generative AI.', ARRAY['Vector database setup', 'Hybrid semantic search engine', 'Context-aware LLM pipeline', 'Production frontend / backend integration'], 'Based on model architecture', '2 - 5 weeks', true, 3),
('srv-fullstack-web', 'Full-Stack Web Development', 'full-stack-web-development', 'Code2', 'Fast, responsive web applications built with Next.js, TypeScript, Tailwind CSS, Supabase, and Node.js.', 'Modern digital products need aesthetic excellence and rock-solid engineering.', ARRAY['Next.js App Router codebase', 'Supabase relational schema with RLS', 'Authentication and storage setup', 'Vercel deployment with CI/CD'], 'Flexible milestones', '3 - 6 weeks', true, 4),
('srv-cybersecurity', 'Cybersecurity & Security Audits', 'cybersecurity-assessments', 'ShieldAlert', 'Authorized penetration testing, web app vulnerability assessments, and secure code reviews for businesses.', 'Proactively safeguard your infrastructure and applications against adversarial threats.', ARRAY['Vulnerability assessment report', 'Proof-of-concept remediation instructions', 'Security debriefing session', 'Re-testing validation'], 'Tiered per surface', '1 - 2 weeks', true, 5),
('srv-corporate-training', 'Corporate Training & Workshops', 'corporate-technical-training', 'GraduationCap', 'Hands-on, immersive masterclasses in Data Science, Generative AI, Python programming, and Ethical Hacking.', 'Empower your engineering, analytics, or business operations teams with practical workshops.', ARRAY['Custom syllabus', 'Live interactive workshops', 'Cheat sheets and reference code', 'Post-training Q&A'], 'Custom per day or bundle', 'On demand', true, 6)
ON CONFLICT (id) DO NOTHING;
