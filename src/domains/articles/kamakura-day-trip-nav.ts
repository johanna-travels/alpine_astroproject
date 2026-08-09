import type { TocGroup } from '@/domains/articles/toc';

export const kamakuraDayTripNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Kamakura Day Trip Overview', target: 'section-0' },
  { navTitle: '3. How to Get to Kamakura from Tokyo', target: 'section-1' },
  {
    navTitle: '4. What to Do in Kamakura',
    target: 'section-best-things',
    children: [
      { navTitle: '4.1 Breakfast at Yoridokoro', target: 'section-2' },
      { navTitle: '4.2 Goryo Shrine', target: 'section-3' },
      { navTitle: '4.3 Hasedera Temple', target: 'section-4' },
      { navTitle: '4.4 Kotoku-in & the Great Buddha of Kamakura', target: 'section-5' },
      { navTitle: '4.5 Komachi Street', target: 'section-6' },
      { navTitle: '4.6 Optional: Hokokuji Temple', target: 'section-7' },
      { navTitle: '4.7 Optional Sunset Stop: Shichirigahama Beach', target: 'section-8' },
    ],
  },
  { navTitle: '5. Before You Go', target: 'section-9' },
] as const;
