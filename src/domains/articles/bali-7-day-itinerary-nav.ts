import type { TocGroup } from '@/domains/articles/toc';

export const bali7DayItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. A Few Things to Know Before Your Bali Trip', target: 'section-travel-tips' },
  { navTitle: '3. Day 1: Arrive in Bali & Nusa Dua', target: 'section-0' },
  { navTitle: '4. Day 2: Nusa Penida Day Trip', target: 'section-1' },
  { navTitle: '5. Day 3: Uluwatu', target: 'section-2' },
  { navTitle: '6. Day 4: Ubud', target: 'section-3' },
  { navTitle: '7. Day 5: Bali Beyond the Beaches', target: 'section-4' },
  { navTitle: "8. Day 6: The Ubud You've Been Waiting For", target: 'section-5' },
  { navTitle: '9. Day 7: One Last Morning in Bali', target: 'section-6' },
  { navTitle: '10. Where to Stay in Bali', target: 'section-where-to-stay' },
  {
    navTitle: '11. FAQ',
    children: [
      { navTitle: '11.1 What should I know before traveling to Bali?', target: 'faq-0' },
      { navTitle: '11.2 Is 7 days enough to explore Bali?', target: 'faq-1' },
      { navTitle: "11.3 What's the best way to get around Bali?", target: 'faq-2' },
      { navTitle: '11.4 When is the best time to visit Bali?', target: 'faq-3' },
      { navTitle: '11.5 How much time should I spend in each area of Bali?', target: 'faq-4' },
    ],
  },
  { navTitle: '12. Final Thoughts', target: 'section-final-thoughts' },
] as const;
