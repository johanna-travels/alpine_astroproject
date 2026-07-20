import type { TocGroup } from '@/domains/articles/toc';

export const tokyoTemplesNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Sensō-ji Temple – Asakusa', target: 'section-0' },
  { navTitle: '3. Meiji Jingu – Harajuku', target: 'section-1' },
  { navTitle: '4. Hie Shrine – Akasaka', target: 'section-2' },
  { navTitle: '5. Gotokuji Temple – Setagaya', target: 'section-3' },
  { navTitle: '6. Before You Go', target: 'section-4' },
] as const;
