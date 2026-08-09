import type { TocGroup } from '@/domains/articles/toc';

export const baliTravelTipsNav: readonly TocGroup[] = [
	{ navTitle: '1. Intro', target: 'section-intro' },
	{ navTitle: '2. Buy Your Visa on Arrival', target: 'section-0' },
	{ navTitle: '3. Get an eSIM Before You Arrive', target: 'section-1' },
	{ navTitle: '4. Cash or Card?', target: 'section-2' },
	{ navTitle: '5. When to Visit Bali', target: 'section-when-to-visit' },
	{ navTitle: '6. Where to Stay in Bali', target: 'section-where-to-stay' },
	{ navTitle: '7. Travel Insurance', target: 'section-insurance' },
	{ navTitle: '8. How to Get Around Bali', target: 'section-3' },
	{ navTitle: '9. My Bali Travel Pharmacy', target: 'section-4' },
	{ navTitle: "10. Don't Drink Tap Water", target: 'section-5' },
	{ navTitle: '11. Before You Go', target: 'section-6' },
] as const;
