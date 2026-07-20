import type { TocGroup } from '@/domains/articles/toc';

export const mtFujiDayTripNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Mount Fuji Day Trip Overview', target: 'section-0' },
  { navTitle: '3. How to Get to Mount Fuji from Tokyo', target: 'section-1' },
  { navTitle: '4. When Is the Best Time to Visit Mount Fuji?', target: 'section-2' },
  {
    navTitle: '5. Best Mount Fuji Day Trip Route',
    target: 'section-3',
    children: [
      { navTitle: '5.1 Chureito Pagoda at Arakurayama Sengen Park', target: 'section-4' },
      { navTitle: '5.2 Honcho 2-chome Shopping District', target: 'section-5' },
      { navTitle: '5.3 Lunch at Ramen Hachiyo', target: 'section-6' },
      { navTitle: '5.4 Around Kawaguchiko Station: Lawson & Nearby Photo Spots', target: 'section-7' },
    ],
  },
  { navTitle: '6. Independent or Organized Mount Fuji Day Trip?', target: 'section-8' },
  { navTitle: '7. Tips for Visiting Mount Fuji from Tokyo', target: 'section-9' },
  { navTitle: '8. Before You Go', target: 'section-10' },
] as const;
