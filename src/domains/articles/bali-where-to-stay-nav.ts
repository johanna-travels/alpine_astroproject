import type { TocGroup } from '@/domains/articles/toc';

export const baliWhereToStayNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Quick Tips', target: 'section-0' },
  { navTitle: '3. Where to Stay in Ubud', target: 'section-1' },
  { navTitle: '4. Where to Stay in Canggu', target: 'section-2' },
  { navTitle: '5. Where to Stay in Munduk', target: 'section-3' },
  { navTitle: '6. Where to Stay in Nusa Dua', target: 'section-4' },
  { navTitle: '7. Before You Go', target: 'section-5' },
] as const;
