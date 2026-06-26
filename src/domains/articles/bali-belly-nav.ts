import type { TocGroup } from '@/domains/articles/toc';

export const baliBellyNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How I Experienced Bali Belly', target: 'section-0' },
  { navTitle: '3. Can You Prevent Bali Belly?', target: 'section-1' },
  { navTitle: '4. Before You Go', target: 'section-2' },
] as const;
