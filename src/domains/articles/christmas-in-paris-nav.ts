import type { TocGroup } from '@/domains/articles/toc';

export const christmasInParisNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Why Visit Paris at Christmas?', target: 'section-0' },
  { navTitle: '3. Best Things to Do', target: 'section-1' },
  { navTitle: '4. Best Christmas Markets', target: 'section-2' },
  { navTitle: '5. Best Photo Spots', target: 'section-3' },
  { navTitle: '6. Best Hot Chocolate', target: 'section-4' },
  { navTitle: '7. Where to Stay', target: 'section-5' },
  { navTitle: '8. Where to Eat', target: 'section-6' },
  {
    navTitle: '9. FAQ',
    children: [
      { navTitle: '9.1 Is Christmas in Paris worth it?', target: 'faq-0' },
      { navTitle: '9.2 Is Christmas in Paris expensive?', target: 'faq-1' },
      { navTitle: '9.3 When does Christmas in Paris start?', target: 'faq-2' },
      { navTitle: '9.4 When do Christmas markets in Paris start?', target: 'faq-3' },
    ],
  },
  { navTitle: '10. Before You Go', target: 'section-7' },
] as const;
