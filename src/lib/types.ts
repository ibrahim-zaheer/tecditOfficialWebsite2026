export type Industry =
  | "Home Services"
  | "Automotive"
  | "Health & Fitness"
  | "Restaurants"
  | "Beauty & Salons"
  | "Legal"
  | "Healthcare"
  | "Cleaning Services"
  | "HVAC"
  | "Construction"
  | "Retail";

export type ProjectStatus = "concept" | "client";

export interface Project {
  slug: string;
  name: string;
  category: string;
  industry: Industry;
  tag: string;
  status: ProjectStatus;
  summary: string;
  goals: string[];
  features: string[];
  technologies: string[];
  outcome: string;
  highlights: string[];
  palette: string[];
  typography: {
    heading: string;
    body: string;
  };
  designApproach: string;
  uxHighlights: string[];
  seoStrategy: string[];
  conversionStrategy: string[];
  gradient: [string, string];
  ctaLabel: string;
  liveUrl: string;
  screenshots: {
    desktop: string;
    mobile: string;
  };
}
