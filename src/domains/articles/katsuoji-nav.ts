import type { TocGroup } from '@/domains/articles/toc';

export const katsuojiNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How to Get to Katsuoji Temple from Osaka', target: 'section-0' },
  { navTitle: '3. Arriving at Katsuoji Temple', target: 'section-1' },
  { navTitle: '4. Exploring the Temple Grounds', target: 'section-2' },
  { navTitle: '5. Useful Tips for Visiting Katsuoji Temple', target: 'section-3' },
  { navTitle: '6. FAQ', target: 'section-4' },
  { navTitle: '7. Before You Go', target: 'section-5' },
] as const;
