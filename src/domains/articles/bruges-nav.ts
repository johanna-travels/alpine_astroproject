import type { TocGroup } from '@/domains/articles/toc';

export const brugesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Bruges', target: 'section-google-map' },
  { navTitle: '3. How to Get to Bruges', target: 'section-how-to-get' },
  {
    navTitle: '4. Best Things to Do in Bruges',
    target: 'section-best-things',
    children: [
      { navTitle: '4.1 Markt Square & Belfry Tower', target: 'section-0' },
      { navTitle: '4.2 Admire the Views at Rozenhoedkaai', target: 'section-1' },
      { navTitle: '4.3 The Old Chocolate House', target: 'section-2' },
      { navTitle: '4.4 Boniface Bridge', target: 'section-3' },
      { navTitle: '4.5 De Gastro', target: 'section-4' },
      { navTitle: "4.6 Explore Bruges' Canals", target: 'section-5' },
      { navTitle: '4.7 Minnewater Lake', target: 'section-6' },
      { navTitle: '4.8 Burg Square', target: 'section-7' },
      { navTitle: '4.9 Otto Waffle Atelier', target: 'section-8' },
      { navTitle: '4.10 The Chocolate Line', target: 'section-9' },
    ],
  },
  {
    navTitle: '5. Where to Stay in Bruges',
    target: 'section-10',
  },
  {
    navTitle: '6. Where to Eat in Bruges',
    target: 'section-11',
  },
  {
    navTitle: '7. FAQ',
    children: [
      { navTitle: '7.1 What Is the Best Time to Visit Bruges?', target: 'faq-0' },
      { navTitle: '7.2 How Many Days Do You Need in Bruges?', target: 'faq-1' },
      { navTitle: '7.3 What Should I Not Miss in Bruges?', target: 'faq-2' },
      { navTitle: '7.4 What Is Bruges Famous For?', target: 'faq-3' },
    ],
  },
  { navTitle: '8. Before You Go', target: 'section-13' },
] as const;
