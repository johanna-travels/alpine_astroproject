import type { TocGroup } from '@/domains/articles/toc';

export const thingsToDoInBangkokNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Important Things to Know Before Visiting Bangkok', target: 'section-tips' },
  { navTitle: '3. How to Get from the Airport to Bangkok', target: 'section-airport' },
  { navTitle: '4. Getting Around Bangkok', target: 'section-getting-around' },
  {
    navTitle: '5. Best Things to Do in Bangkok',
    target: 'section-best-things',
    children: [
      { navTitle: "5.1 Visit Bangkok's Temples", target: 'section-0' },
      { navTitle: '5.2 Try Local Thai Food', target: 'section-1' },
      { navTitle: '5.3 Discover Talat Noi', target: 'section-2' },
      { navTitle: '5.4 Visit a Bangkok Park', target: 'section-3' },
      { navTitle: "5.5 Explore Bangkok's Shopping Malls", target: 'section-4' },
      { navTitle: '5.6 Visit a Sky Bar', target: 'section-5' },
      { navTitle: '5.7 Take a Day Trip from Bangkok', target: 'section-7' },
      { navTitle: '5.8 Erawan Museum', target: 'section-8' },
      { navTitle: '5.9 Take a Night Cruise on the Chao Phraya River', target: 'section-9' },
      { navTitle: '5.10 Explore Chinatown', target: 'section-10' },
      { navTitle: '5.11 Visit a Fairy-Tale Café or a Hidden Garden Restaurant', target: 'section-11' },
    ],
  },
  { navTitle: '6. Where to Stay in Bangkok', target: 'section-where-to-stay' },
  { navTitle: '7. Where to Eat in Bangkok', target: 'section-where-to-eat' },
  {
    navTitle: '8. FAQ',
    children: [
      { navTitle: '8.1 What is the best time to visit Bangkok?', target: 'faq-0' },
      { navTitle: '8.2 How many days do you need in Bangkok?', target: 'faq-1' },
      { navTitle: '8.3 Is Bangkok easy to get around?', target: 'faq-2' },
      { navTitle: '8.4 Is Bangkok expensive to visit?', target: 'faq-3' },
      { navTitle: '8.5 Is Bangkok safe for tourists?', target: 'faq-4' },
      { navTitle: '8.6 What should you wear when visiting temples in Bangkok?', target: 'faq-5' },
      { navTitle: '8.7 Do you need cash in Bangkok?', target: 'faq-6' },
    ],
  },
  { navTitle: '9. Before You Go', target: 'section-before-you-go' },
] as const;
