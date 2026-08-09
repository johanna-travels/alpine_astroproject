import type { TocGroup } from '@/domains/articles/toc';

export const hongKongNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Hong Kong', target: 'section-google-map' },
  {
    navTitle: '3. Top Things to Do in Hong Kong',
    target: 'section-best-things',
    children: [
      { navTitle: '3.1 The Victoria Peak', target: 'section-0' },
      { navTitle: '3.2 Bakehouse', target: 'section-1' },
      { navTitle: '3.3 Monster Building', target: 'section-2' },
      { navTitle: '3.4 Choi Hung Estate Rooftop Basketball Court', target: 'section-3' },
      { navTitle: "3.5 Take a Ride on Hong Kong's Tram", target: 'section-4' },
      { navTitle: '3.6 Hong Kong Park', target: 'section-5' },
      { navTitle: '3.7 Nan Lian Garden', target: 'section-6' },
      { navTitle: '3.8 Chi Lin Nunnery', target: 'section-7' },
      { navTitle: '3.9 Victoria Harbour & Bruce Lee Statue', target: 'section-8' },
    ],
  },
  { navTitle: '4. Where to Stay in Hong Kong', target: 'section-9' },
  { navTitle: '5. FAQ', target: 'section-10' },
  { navTitle: '6. Before You Go', target: 'section-11' },
] as const;
