import type { TocGroup } from '@/domains/articles/toc';

export const baliTravelTipsNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Buy Your Visa on Arrival', target: 'section-0' },
  { navTitle: '3. Get an eSIM Before You Arrive', target: 'section-1' },
  { navTitle: '4. Cash or Card?', target: 'section-2' },
  { navTitle: '5. How to Get Around Bali', target: 'section-3' },
  { navTitle: '6. My Bali Travel Pharmacy', target: 'section-4' },
  { navTitle: "7. Don't Drink Tap Water", target: 'section-5' },
  { navTitle: '8. Before You Go', target: 'section-6' },
] as const;
