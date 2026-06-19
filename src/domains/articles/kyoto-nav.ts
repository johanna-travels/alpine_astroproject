import type { TocGroup } from '@/domains/articles/toc';

export const kyotoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Day 1: Arashiyama & Kinkaku-ji', target: 'section-0' },
  { navTitle: '3. Day 2: Kiyomizu-dera, Yasaka Pagoda & Gion', target: 'section-1' },
  { navTitle: '4. Day 3: Fushimi Inari, Nara & Nishiki Market', target: 'section-2' },
  { navTitle: '5. Where to Stay in Kyoto', target: 'section-3' },
  { navTitle: '6. Where to Eat in Kyoto', target: 'section-4' },
  { navTitle: '7. FAQ', target: 'section-5' },
] as const;
