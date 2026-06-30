import type { TocGroup } from '@/domains/articles/toc';

export const rhodesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Rhodes', target: 'section-google-map' },
  { navTitle: '3. Day 1: Old Town & Mandraki', target: 'section-0' },
  { navTitle: '4. Day 2: Symi Island Day Trip', target: 'section-1' },
  { navTitle: "5. Day 3: Lindos & St. Paul's Bay", target: 'section-2' },
  { navTitle: '6. Day 4: Sunrise & the Acropolis', target: 'section-3' },
  { navTitle: '7. Day 5: Kallithea Springs & Anthony Quinn Bay', target: 'section-4' },
  { navTitle: '8. Where to Stay in Rhodes', target: 'section-5' },
  {
    navTitle: '9. FAQ',
    children: [
      { navTitle: '9.1 How do you get to Rhodes?', target: 'faq-0' },
      { navTitle: '9.2 How do you get around Rhodes?', target: 'faq-1' },
      { navTitle: '9.3 What is the best time to visit Rhodes?', target: 'faq-2' },
      { navTitle: '9.4 How do you get to Lindos?', target: 'faq-3' },
      { navTitle: '9.5 How do you get to Symi Island?', target: 'faq-4' },
      { navTitle: '9.6 Do you need a car in Symi?', target: 'faq-5' },
    ],
  },
  { navTitle: '10. Final Thoughts', target: 'section-7' },
] as const;
