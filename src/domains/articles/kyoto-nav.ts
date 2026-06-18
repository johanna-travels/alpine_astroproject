import type { TocGroup } from '@/domains/articles/toc';

export const kyotoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Day 1: Eastern Kyoto & Higashiyama', target: 'section-0' },
  { navTitle: '3. Day 2: Arashiyama & Bamboo Grove', target: 'section-1' },
  { navTitle: '4. Day 3: Fushimi Inari & Southern Kyoto', target: 'section-2' },
  { navTitle: '5. Day 4: Gion & Traditional Kyoto', target: 'section-3' },
  { navTitle: '6. Day 5: Golden Pavilion & Departure', target: 'section-4' },
] as const;
