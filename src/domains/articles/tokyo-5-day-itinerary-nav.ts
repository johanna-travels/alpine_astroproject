import type { TocGroup } from '@/domains/articles/toc';

export const tokyo5DayItineraryNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Day 1: Sensō-ji Temple & Shinjuku at Night', target: 'section-0' },
  { navTitle: '3. Day 2: teamLab Borderless, Tokyo Tower & Akasaka', target: 'section-1' },
  { navTitle: '4. Day 3: Harajuku, Meiji Shrine & Shibuya', target: 'section-2' },
  { navTitle: '5. Day 4: Kamakura Day Trip from Tokyo', target: 'section-3' },
  { navTitle: '6. Day 5: Mount Fuji Day Trip from Tokyo', target: 'section-4' },
  { navTitle: '7. Where to Stay in Tokyo', target: 'section-5' },
  { navTitle: '8. FAQ', target: 'section-6' },
  { navTitle: '9. Final Thoughts', target: 'section-7' },
] as const;
