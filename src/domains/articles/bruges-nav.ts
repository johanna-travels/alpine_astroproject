import type { TocGroup } from '@/domains/articles/toc';

export const brugesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  {
    navTitle: '2. Top Things to Do in Bruges',
    children: [
      { navTitle: '2.1 Markt Square & Belfry Tower', target: 'section-0' },
      { navTitle: '2.2 Rozenhoedkaai Canal View', target: 'section-1' },
      { navTitle: '2.3 Boniface Bridge', target: 'section-2' },
      { navTitle: '2.4 Bruges Canals Walk', target: 'section-3' },
      { navTitle: '2.5 Minnewater Lake', target: 'section-4' },
      { navTitle: '2.6 Burg Square', target: 'section-5' },
    ],
  },
  {
    navTitle: '3. Food & Cafés in Bruges',
    children: [
      { navTitle: '3.1 Otto Waffle Atelier', target: 'section-6' },
      { navTitle: '3.2 De Gastro', target: 'section-7' },
    ],
  },
  {
    navTitle: '4. Chocolate Shops in Bruges',
    children: [
      { navTitle: '4.1 The Old Chocolate House', target: 'section-8' },
      { navTitle: '4.2 The Chocolate Line', target: 'section-9' },
    ],
  },
  {
    navTitle: '5. FAQ',
    children: [
      { navTitle: '5.1 Is Bruges worth visiting?', target: 'faq-0' },
      { navTitle: '5.2 How many days do you need in Bruges?', target: 'faq-1' },
      { navTitle: '5.3 What is the best time to visit Bruges?', target: 'faq-2' },
      { navTitle: '5.4 How to get to Bruges?', target: 'faq-3' },
    ],
  },
  { navTitle: '6. Before You Go', target: 'section-11' },
] as const;
