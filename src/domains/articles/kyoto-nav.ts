import type { TocGroup } from '@/domains/articles/toc';

export const kyotoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Kyoto', target: 'section-google-map' },
  { navTitle: '3. Day 1: Arashiyama & Kinkaku-ji', target: 'section-0' },
  { navTitle: '4. Day 2: Kiyomizu-dera, Yasaka Pagoda & Gion', target: 'section-1' },
  { navTitle: '5. Day 3: Fushimi Inari, Nara & Nishiki Market', target: 'section-2' },
  { navTitle: '6. Where to Stay in Kyoto', target: 'section-3' },
  { navTitle: '7. Where to Eat in Kyoto', target: 'section-4' },
  { navTitle: '8. FAQ', target: 'section-5' },
  { navTitle: '9. Final Thoughts', target: 'section-6' },
] as const;
