import type { TocGroup } from '@/domains/articles/toc';

export const tokyoWhereToStayNav: readonly TocGroup[] = [
	{ navTitle: '1. Intro', target: 'section-intro' },
	{ navTitle: '2. Best Areas at a Glance', target: 'section-0' },
	{ navTitle: '3. Shibuya', target: 'section-1' },
	{ navTitle: '4. Minato City', target: 'section-2' },
	{ navTitle: '5. Ginza', target: 'section-3' },
	{ navTitle: '6. Shinjuku', target: 'section-4' },
	{ navTitle: '7. Chiyoda City', target: 'section-5' },
	{ navTitle: '8. Asakusa', target: 'section-6' },
	{ navTitle: '9. Harajuku', target: 'section-7' },
	{ navTitle: '10. Akihabara', target: 'section-8' },
	{ navTitle: '11. Bunkyo', target: 'section-9' },
	{ navTitle: '12. Sumida City', target: 'section-10' },
	{ navTitle: '13. Before You Go', target: 'section-11' },
] as const;
