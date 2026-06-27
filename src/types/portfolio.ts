export type Profile = {
  slug: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  phone?: string | null;
  summary: string;
  resumeUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  order?: number;
};

export type Project = {
  title: string;
  subtitle?: string | null;
  description: string;
  technologies: string[];
  metrics: string[];
  featured: boolean;
  order?: number;
};

export type SkillGroup = {
  name: string;
  items: string[];
  order?: number;
};

export type Education = {
  institution: string;
  credential: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string | null;
  order?: number;
};

export type Publication = {
  title: string;
  identifier?: string | null;
  publishedAt: string;
  summary: string;
  order?: number;
};

export type Portfolio = {
  profile: Profile;
  siteText: Record<string, string>;
  experiences: Experience[];
  projects: Project[];
  skillGroups: SkillGroup[];
  education: Education[];
  publications: Publication[];
};
