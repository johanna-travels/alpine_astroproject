import type { TocGroup } from '@/domains/articles/toc';

export const threeDayBangkokItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How to Get from the Airport to Bangkok', target: 'section-airport' },
  { navTitle: "3. Day 1: Bangkok's Famous Temples, ICONSIAM & Chinatown", target: 'section-day1' },
  { navTitle: '4. Day 2: The Marble Temple, Talat Noi & Rooftop Views', target: 'section-day2' },
  { navTitle: '5. Day 3: Erawan Museum & Wat Paknam Phasi Charoen', target: 'section-day3' },
  { navTitle: '6. Have an Extra Day in Bangkok?', target: 'section-extra-day' },
  { navTitle: '7. Important Things to Know Before Visiting Bangkok', target: 'section-tips' },
  { navTitle: '8. Where to Stay in Bangkok', target: 'section-where-to-stay' },
  { navTitle: '9. Where to Eat in Bangkok', target: 'section-where-to-eat' },
  {
    navTitle: '10. FAQ',
    children: [
      { navTitle: '10.1 What is the best time to visit Bangkok?', target: 'faq-0' },
      { navTitle: '10.2 How many days do you need in Bangkok?', target: 'faq-1' },
      { navTitle: '10.3 Is Bangkok easy to get around?', target: 'faq-2' },
      { navTitle: '10.4 Is Bangkok expensive to visit?', target: 'faq-3' },
      { navTitle: '10.5 Is Bangkok safe for tourists?', target: 'faq-4' },
      { navTitle: '10.6 What should you wear when visiting temples in Bangkok?', target: 'faq-5' },
      { navTitle: '10.7 Do you need cash in Bangkok?', target: 'faq-6' },
      { navTitle: '10.8 How to Get Around Bangkok', target: 'faq-7' },
    ],
  },
  { navTitle: '11. Final Thoughts', target: 'section-final-thoughts' },
] as const;
