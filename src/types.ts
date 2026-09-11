export type PageRoute = 
  | 'command-center'
  | 'about'
  | 'experience'
  | 'vayushetra'
  | 'guard-system'
  | 'ai-assistant'
  | 'tech-layoffs'
  | '11-towers'
  | 'telemetry'
  | 'achievements'
  | 'terminal';

export interface ProjectMetadata {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: string;
  period: string;
  route: PageRoute;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'AI/ML' | 'Geospatial Intelligence' | 'Full Stack' | 'Data Science' | 'Cloud & DevOps' | 'Core Engineering';
  level: number;
  description: string;
  associatedProjects: string[];
  coordinates: [number, number, number];
}
