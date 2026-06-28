import type { TocGroup } from '@/domains/articles/toc';

export const brugesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Bruges', target: 'section-google-map' },
  {
    navTitle: '3. Top Things to Do in Bruges',
    children: [
      { navTitle: '3.1 Markt Square & Belfry Tower', target: 'section-0' },
      { navTitle: '3.2 Rozenhoedkaai Canal View', target: 'section-1' },
      { navTitle: '3.3 Boniface Bridge', target: 'section-2' },
      { navTitle: '3.4 Bruges Canals Walk', target: 'section-3' },
      { navTitle: '3.5 Minnewater Lake', target: 'section-4' },
      { navTitle: '3.6 Burg Square', target: 'section-5' },
    ],
  },
  {
    navTitle: '4. Waffle & Restaurant in Bruges',
    children: [
      { navTitle: '4.1 Otto Waffle Atelier', target: 'section-6' },
      { navTitle: '4.2 De Gastro', target: 'section-7' },
    ],
  },
  {
    navTitle: '5. Hot Chocolate & Chocolateries in Bruges',
    children: [
      { navTitle: '5.1 The Old Chocolate House', target: 'section-8' },
      { navTitle: '5.2 The Chocolate Line', target: 'section-9' },
    ],
  },
  {
    navTitle: '6. Where to Stay in Bruges',
    target: 'section-10',
  },
  {
    navTitle: '7. FAQ',
    children: [
      { navTitle: '7.1 How to get to Bruges?', target: 'faq-0' },
      { navTitle: '7.2 What is the best time to visit Bruges?', target: 'faq-1' },
      { navTitle: '7.3 How many days do you need in Bruges?', target: 'faq-2' },
      { navTitle: '7.4 Is Bruges worth visiting?', target: 'faq-3' },
    ],
  },
  { navTitle: '8. Before You Go', target: 'section-12' },
] as const;
