import type { TocGroup } from '@/domains/articles/toc';

export const parisThingsToDoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How to Get to Paris', target: 'section-0' },
  { navTitle: '3. How to Get Around Paris', target: 'section-1' },
  {
    navTitle: '4. Best Things to Do in Paris',
    target: 'section-best-things',
    children: [
      { navTitle: '4.1 Eiffel Tower & Trocadéro', target: 'section-2' },
      { navTitle: '4.2 Opéra Garnier', target: 'section-opera' },
      { navTitle: '4.3 Notre-Dame & Île de la Cité', target: 'section-3' },
      { navTitle: '4.4 Arc de Triomphe & Champs-Élysées', target: 'section-4' },
      { navTitle: '4.5 Montmartre & Sacré-Cœur', target: 'section-5' },
      { navTitle: '4.6 Pont Alexandre III', target: 'section-6' },
      { navTitle: '4.7 Jardin du Palais Royal', target: 'section-7' },
    ],
  },
  { navTitle: '5. Best Day Trips from Paris', target: 'section-8' },
  { navTitle: '6. Best Museums in Paris', target: 'section-9' },
  { navTitle: '7. Best Bakeries in Paris', target: 'section-10' },
  { navTitle: '8. Best Hot Chocolate in Paris', target: 'section-11' },
  { navTitle: '9. Where to Eat in Paris', target: 'section-12' },
  { navTitle: '10. Where to Stay in Paris', target: 'section-13' },
  {
    navTitle: '11. FAQ',
    children: [
      { navTitle: '11.1 How many days do you need in Paris?', target: 'faq-0' },
      { navTitle: '11.2 What is the best time to visit Paris?', target: 'faq-1' },
      { navTitle: '11.3 Is Paris expensive?', target: 'faq-2' },
      { navTitle: '11.4 Is Paris easy to explore on foot?', target: 'faq-3' },
      { navTitle: '11.5 Do you need to book attractions in advance?', target: 'faq-4' },
      { navTitle: '11.6 Do you need to speak French in Paris?', target: 'faq-5' },
    ],
  },
  { navTitle: '12. Before You Go', target: 'section-14' },
] as const;
