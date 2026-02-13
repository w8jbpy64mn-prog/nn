export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  caseStudy: string;
  impact: string;
  beforeImage?: string;
  afterImage?: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  visible: boolean;
};
