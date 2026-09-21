import type { TocGroup } from '@/domains/articles/toc';

export const osloThingsToDoNav: readonly TocGroup[] = [
  { navTitle: '1. Intro', target: 'section-intro' },
  { navTitle: '2. How to Get to Oslo', target: 'section-0' },
  { navTitle: '3. How to Get Around Oslo', target: 'section-1' },
  {
    navTitle: '4. Best Things to Do in Oslo',
    target: 'section-best-things',
    children: [
      { navTitle: '4.1 Oslo Opera House', target: 'section-2' },
      { navTitle: '4.2 MUNCH', target: 'section-3' },
      { navTitle: '4.3 Akershus Fortress', target: 'section-4' },
      { navTitle: '4.4 Frogner Park & Vigeland Sculpture Park', target: 'section-5' },
      { navTitle: '4.5 Deichman Bjørvika', target: 'section-6' },
      { navTitle: '4.6 The Royal Palace & National Theatre', target: 'section-7' },
      { navTitle: '4.7 Aker Brygge & Tjuvholmen', target: 'section-8' },
      { navTitle: '4.8 Bygdøy', target: 'section-9' },
      { navTitle: '4.9 Damstredet & Telthusbakken', target: 'section-10' },
      { navTitle: '4.10 Ekebergparken', target: 'section-11' },
      { navTitle: '4.11 Akerselva & Grünerløkka', target: 'section-12' },
    ],
  },
  { navTitle: '5. Where to Stay in Oslo', target: 'section-13' },
  { navTitle: '6. Where to Eat in Oslo', target: 'section-14' },
  { navTitle: '7. Best Cafés in Oslo', target: 'section-15' },
  { navTitle: '8. Best Bakeries in Oslo', target: 'section-bakeries' },
  {
    navTitle: '9. FAQ',
    children: [
      { navTitle: '9.1 Is Oslo a walkable city?', target: 'faq-0' },
      { navTitle: '9.2 Is Oslo expensive?', target: 'faq-1' },
      { navTitle: '9.3 Is Oslo worth visiting for three days?', target: 'faq-2' },
      { navTitle: '9.4 What is the best time to visit Oslo?', target: 'faq-3' },
      { navTitle: '9.5 Is Oslo worth visiting?', target: 'faq-4' },
    ],
  },
  { navTitle: '10. Before You Go', target: 'section-16' },
] as const;
