import type { TocGroup } from '@/domains/articles/toc';

export const osakaItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Start Your Day at Namba Yasaka Shrine', target: 'section-0' },
  { navTitle: '3. Continue to Katsuoji Temple', target: 'section-1' },
  { navTitle: '4. Lunch at Ichiran Ramen', target: 'section-2' },
  { navTitle: '5. Treat Yourself to Pancakes at Toichi', target: 'section-3' },
  { navTitle: '6. Spend the Evening in Dotonbori', target: 'section-4' },
  { navTitle: '7. Final Thoughts', target: 'section-5' },
] as const;
