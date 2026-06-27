import type { TocGroup } from '@/domains/articles/toc';

export const pargaNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. Start Your Morning at the View of Parga', target: 'section-0' },
  { navTitle: '3. Have Breakfast at The Green Bakery', target: 'section-1' },
  { navTitle: '4. Wander Through the Streets of Parga', target: 'section-2' },
  { navTitle: '5. Visit the Venetian Castle', target: 'section-3' },
  { navTitle: '6. Spend the Afternoon at Valtos Beach', target: 'section-4' },
  { navTitle: '7. End the Day at Petros Restaurant', target: 'section-5' },
  { navTitle: '8. FAQ About Visiting Parga', target: 'section-6' },
  { navTitle: '9. Final Thoughts', target: 'section-7' },
] as const;
