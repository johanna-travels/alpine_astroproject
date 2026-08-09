import type { TocGroup } from '@/domains/articles/toc';

export const tokyoThingsToDoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Drive Through Tokyo in a Street Kart', target: 'section-0' },
  { navTitle: '3. Get Lost Inside teamLab Borderless', target: 'section-1' },
  { navTitle: '4. See Tokyo Tower From a Different Perspective', target: 'section-2' },
  { navTitle: '5. Visit Sensō-ji Temple', target: 'section-3' },
  { navTitle: '6. Tokyu Plaza Omotesando Rooftop Garden', target: 'section-4' },
  { navTitle: '7. Go Coffee Hopping Around Tokyo', target: 'section-5' },
  { navTitle: '8. Visit Gotokuji Temple and See the Lucky Cats', target: 'section-6' },
  { navTitle: '9. Learn How to Make Your Own Sushi', target: 'section-7' },
  { navTitle: '10. Take a Day Trip to Mount Fuji', target: 'section-8' },
  { navTitle: '11. Take a Day Trip to Kamakura', target: 'section-9' },
  { navTitle: '12. Before You Go', target: 'section-10' },
] as const;
