import type { PortableTextBlock } from '@portabletext/types';
import type { DestinationSlug } from '@/domains/destinations/catalog';
import type { ImageMetadata } from 'astro';

export type SanityArticleSection = {
  navTitle: string;
  sectionId: string;
  heading: string;
  body: PortableTextBlock[];
};

export type SanityArticleListItem = {
  slug: string;
  title: string;
  category: string;
  destinationSlug: DestinationSlug;
  publishedDate: string;
  intro: string[];
  seoTitle?: string;
  seoDescription?: string;
  heroImageUrl: string;
  heroImageAlt: string;
};

export type SanityArticle = SanityArticleListItem & {
  sections: SanityArticleSection[];
};

/** Static article slugs already implemented as .astro pages — Sanity must not duplicate these. */
export const STATIC_ARTICLE_SLUGS = new Set([
  'bali-cafes',
  'bruges-guide',
  'kyoto-itinerary',
  'nara-day-trip-from-kyoto',
  'rhodes-itinerary',
  'katsuoji-temple-from-osaka',
]);
