import type { TocGroup } from '@/domains/articles/toc';

export const tokyoParksNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Tokyu Plaza Omokado Rooftop Garden', target: 'section-0' },
  { navTitle: '3. Yoyogi Park', target: 'section-1' },
  { navTitle: '4. Ueno Park', target: 'section-2' },
  { navTitle: '5. Shinjuku Gyoen National Garden', target: 'section-3' },
  { navTitle: '6. Before You Go', target: 'section-4' },
] as const;
