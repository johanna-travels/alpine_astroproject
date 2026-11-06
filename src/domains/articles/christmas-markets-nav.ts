import type { TocGroup } from '@/domains/articles/toc';

export const christmasMarketsNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How to Get to Bruges', target: 'section-0' },
  { navTitle: '3. Where to Stay in Bruges', target: 'section-1' },
  { navTitle: '4. What to Do in Bruges', target: 'section-2' },
  { navTitle: '5. Best Christmassy Things to Do in Bruges', target: 'section-3' },
  { navTitle: '6. Christmas Markets in Bruges', target: 'section-4' },
  { navTitle: '7. Winter Glow Festival in Bruges', target: 'section-winter-glow' },
  {
    navTitle: '8. FAQ',
    children: [
      { navTitle: '8.1 When do the Christmas markets in Bruges open?', target: 'faq-0' },
      { navTitle: '8.2 How many Christmas markets are there in Bruges?', target: 'faq-1' },
      { navTitle: '8.3 Are the Christmas markets in Bruges free to enter?', target: 'faq-2' },
      { navTitle: '8.4 Are the Christmas markets in Bruges worth visiting?', target: 'faq-3' },
      { navTitle: '8.5 How long do you need to visit the Christmas markets?', target: 'faq-4' },
    ],
  },
  { navTitle: '9. Before You Go', target: 'section-6' },
] as const;
