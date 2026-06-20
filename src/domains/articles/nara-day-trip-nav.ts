import type { TocGroup } from '@/domains/articles/toc';

export const naraDayTripNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Start at Nakatanidou for Fresh Mochi', target: 'section-0' },
  { navTitle: '3. Walk Through Isuien Garden', target: 'section-1' },
  { navTitle: '4. Head Towards Todai-ji Temple', target: 'section-2' },
  { navTitle: '5. Feeding the Deer in Nara Park', target: 'section-4' },
  { navTitle: '6. Useful Tips for Visiting Nara', target: 'section-3' },
  { navTitle: '7. Places to Eat or Take a Break Near Nara Park', target: 'section-7' },
  { navTitle: '8. FAQ', target: 'section-5' },
  { navTitle: '9. Before You Go', target: 'section-6' },
] as const;
