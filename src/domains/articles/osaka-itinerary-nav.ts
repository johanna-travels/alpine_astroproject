import type { TocGroup } from '@/domains/articles/toc';

export const osakaItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Osaka', target: 'section-google-map' },
  { navTitle: '3. Start Your Day at Namba Yasaka Shrine', target: 'section-0' },
  { navTitle: '4. Continue to Katsuoji Temple', target: 'section-1' },
  { navTitle: '5. Lunch at Ichiran Ramen', target: 'section-2' },
  { navTitle: '6. Treat Yourself to Pancakes at Toichi', target: 'section-3' },
  { navTitle: '7. Spend the Evening in Dotonbori', target: 'section-4' },
  { navTitle: '8. FAQ', target: 'section-5' },
  { navTitle: '9. Final Thoughts', target: 'section-6' },
] as const;
