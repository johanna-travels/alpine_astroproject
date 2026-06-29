import type { TocGroup } from '@/domains/articles/toc';

export const pargaNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Google Map of Parga', target: 'section-google-map' },
  { navTitle: '3. Start Your Morning at Parga Harbour', target: 'section-0' },
  { navTitle: '4. Have Breakfast at The Green Bakery', target: 'section-1' },
  { navTitle: '5. Wander Through the Streets of Parga', target: 'section-2' },
  { navTitle: '6. Visit the Venetian Castle', target: 'section-3' },
  { navTitle: '7. Spend the Afternoon at Valtos Beach', target: 'section-4' },
  { navTitle: '8. End the Day at Petros Restaurant', target: 'section-5' },
  { navTitle: '9. FAQ', target: 'section-6' },
  { navTitle: '10. Final Thoughts', target: 'section-7' },
] as const;
