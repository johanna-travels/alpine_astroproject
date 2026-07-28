import type { TocGroup } from '@/domains/articles/toc';

export const mundukModingPlantationReviewNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Sustainability at the Resort', target: 'section-0' },
  { navTitle: '3. The Infinity Pool', target: 'section-1' },
  { navTitle: '4. My Villa Stay', target: 'section-2' },
  { navTitle: '5. Coffee Plantation Tour', target: 'section-3' },
  { navTitle: '6. Before You Go', target: 'section-4' },
] as const;
