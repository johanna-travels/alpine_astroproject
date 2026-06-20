import type { TocGroup } from '@/domains/articles/toc';

export const baliNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Tis Café (Tegallalang)', target: 'section-0' },
  { navTitle: '3. Wedja Restaurant (Ubud)', target: 'section-1' },
  { navTitle: '4. Blend Café (Ubud)', target: 'section-2' },
  { navTitle: '5. Single Fin (Uluwatu)', target: 'section-3' },
  { navTitle: '6. Brunch Club Pererenan', target: 'section-4' },
  { navTitle: '7. Other Cafés Worth Visiting', target: 'section-5' },
  { navTitle: '8. Before You Go', target: 'section-6' },
] as const;
