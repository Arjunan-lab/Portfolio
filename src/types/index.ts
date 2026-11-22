export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  technicalApproach: string;
  keyFeatures: string[];
  techStack: string[];
  tags: ('ai' | 'fullstack' | 'systems')[];
  coverImage?: string;
  implementationDetails?: string[];
  githubUrl?: string;
  demoUrl?: string;
  visuals?: {
    type: 'image' | 'blueprint' | 'interactive';
    src?: string;
    caption?: string;
    label?: string;
  }[];
  status?: {
    implemented: string[];
    planned: string[];
  };
}

export interface SkillCategory {
  title: string;
  label: string;
  description: string;
  skills: string[];
}

export interface Milestone {
  id: string;
  period: string;
  year: string;
  title: string;
  organization: string;
  type: 'Patent' | 'Internship' | 'Certification' | 'Award';
  description: string;
  highlights: string[];
  credentialUrl?: string;
  badge?: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface PhilosophyItem {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
}

