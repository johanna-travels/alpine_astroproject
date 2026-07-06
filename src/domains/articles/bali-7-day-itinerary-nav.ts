import type { TocGroup } from '@/domains/articles/toc';

export const bali7DayItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Day 1: Arrive in Bali & Nusa Dua', target: 'section-0' },
  { navTitle: '3. Day 2: Nusa Penida Day Trip', target: 'section-1' },
  { navTitle: '4. Day 3: Uluwatu', target: 'section-2' },
  { navTitle: '5. Day 4: Ubud', target: 'section-3' },
  { navTitle: '6. Day 5: Bali Beyond the Beaches', target: 'section-4' },
  { navTitle: "7. Day 6: The Ubud You've Been Waiting For", target: 'section-5' },
  { navTitle: '8. Day 7: One Last Morning in Bali', target: 'section-6' },
  {
    navTitle: '9. FAQ',
    children: [
      { navTitle: '9.1 What should I know before travelling to Bali?', target: 'faq-0' },
      { navTitle: '9.2 Is 7 days enough to explore Bali?', target: 'faq-1' },
      { navTitle: "9.3 What's the best way to get around Bali?", target: 'faq-2' },
      { navTitle: '9.4 When is the best time to visit Bali?', target: 'faq-3' },
      { navTitle: '9.5 How much time should I spend in each area of Bali?', target: 'faq-4' },
    ],
  },
  { navTitle: '10. Final Thoughts', target: 'section-final-thoughts' },
] as const;
