import type { TocGroup } from '@/domains/articles/toc';

export const rhodesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Day 1: Old Town & Mandraki', target: 'section-0' },
  { navTitle: '3. Day 2: Symi Island Day Trip', target: 'section-1' },
  { navTitle: "4. Day 3: Lindos & St. Paul's Bay", target: 'section-2' },
  { navTitle: '5. Day 4: Sunrise & the Acropolis', target: 'section-3' },
  { navTitle: '6. Day 5: Kallithea Springs & Anthony Quinn Bay', target: 'section-4' },
  {
    navTitle: '7. FAQ',
    children: [
      { navTitle: '7.1 Is 5 days enough in Rhodes?', target: 'faq-0' },
      { navTitle: '7.2 How to get around Rhodes?', target: 'faq-1' },
      { navTitle: '7.3 Where should you stay in Rhodes?', target: 'faq-2' },
      { navTitle: '7.4 Is Lindos worth visiting?', target: 'faq-3' },
      { navTitle: '7.5 Is Symi worth visiting?', target: 'faq-4' },
      { navTitle: '7.6 Best time to visit Rhodes?', target: 'faq-5' },
    ],
  },
  { navTitle: '8. Final Thoughts', target: 'section-6' },
] as const;
