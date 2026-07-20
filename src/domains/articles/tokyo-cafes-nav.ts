import type { TocGroup } from '@/domains/articles/toc';

export const tokyoCafesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. HATCOFFEE – Asakusa', target: 'section-0' },
  { navTitle: '3. Latte Art Mania Ginza', target: 'section-1' },
  { navTitle: '4. Ken’s Coffee Shop', target: 'section-2' },
  { navTitle: '5. Turret Coffee – Tsukiji', target: 'section-3' },
  { navTitle: '6. Starbucks Reserve Roastery Tokyo', target: 'section-4' },
  { navTitle: '7. Before You Go', target: 'section-5' },
] as const;
