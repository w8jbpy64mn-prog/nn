import { Project, Service, SocialLink } from '@/lib/types';

export const services: Service[] = [
  { id: '1', title: 'Healthy Meal Engineering', description: 'Menu systems balancing nutrition, taste, and profitability.', icon: '🥗' },
  { id: '2', title: 'Food Cost Optimization', description: 'Data-driven cost control with premium quality retention.', icon: '📊' },
  { id: '3', title: 'Smart Subscription Systems', description: 'Automated recurring meal programs and retention loops.', icon: '🔁' },
  { id: '4', title: 'Inventory & Waste Control', description: 'Operational intelligence to reduce waste and improve stock turnover.', icon: '📦' },
  { id: '5', title: 'Kitchen Leadership & SOP Design', description: 'Executive-grade SOP frameworks for high-performance teams.', icon: '👨‍🍳' },
  { id: '6', title: 'Restaurant Digital Transformation', description: 'Integrated digital workflows from kitchen to customer touchpoints.', icon: '⚙️' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Subscription Meal Engine Revamp',
    summary: 'Redesigned subscription operations for a premium meal brand.',
    caseStudy: 'Introduced smart routing, prep batching, and customer segmentation.',
    impact: '38% reduction in fulfillment errors and 24% growth in repeat orders.',
  },
  {
    id: 'p2',
    title: 'Kitchen SOP Performance Program',
    summary: 'Built SOP architecture for a multi-branch restaurant operation.',
    caseStudy: 'Created role-based SOP packs, QA checklists, and shift scorecards.',
    impact: 'Food consistency score improved to 96% across branches.',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'ig', platform: 'Instagram', url: 'https://instagram.com/', visible: true },
  { id: 'tt', platform: 'TikTok', url: 'https://tiktok.com/', visible: true },
  { id: 'yt', platform: 'YouTube', url: 'https://youtube.com/', visible: true },
  { id: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/', visible: true },
  { id: 'wa', platform: 'WhatsApp', url: 'https://wa.me/', visible: true },
];
