import type { ImageMetadata } from 'astro';
import articleBali from '@/assets/articles/Article Bali.webp';
import articleBruges from '@/assets/articles/Article Bruges.webp';
import articleGreece from '@/assets/articles/Article Greece.webp';
import articleKyoto from '@/assets/articles/Article Kyoto.webp';
import type { DestinationSlug } from '@/domains/destinations/catalog';
import { pageUrl } from '@/lib/site';

export type ArticleSlug = 'bali-cafes' | 'bruges-guide' | 'kyoto-itinerary' | 'rhodes-itinerary';

export interface Article {
  slug: ArticleSlug;
  destinationSlug: DestinationSlug;
  category: string;
  title: string;
  carouselTitle: string;
  breadcrumbTitle: string;
  metaLabel: string;
  alt: string;
  image: ImageMetadata;
  lead?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const articles: readonly Article[] = [
  {
    slug: 'kyoto-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Kyoto 5-Day Itinerary',
    carouselTitle: 'Kyoto 5-Day Itinerary',
    breadcrumbTitle: 'Kyoto Itinerary',
    metaLabel: 'Japan',
    alt: 'Kyoto travel guide',
    image: articleKyoto,
    lead: 'Five days in Kyoto, balancing iconic temples with quiet neighbourhoods, slow mornings and the kind of details that make the city stay with you.',
  },
  {
    slug: 'bali-cafes',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'My Favorite Cafés in Bali',
    carouselTitle: 'My Favorite Cafés in Bali',
    breadcrumbTitle: 'Bali Cafés',
    metaLabel: 'Bali',
    alt: 'Bali cafés guide',
    image: articleBali,
    lead: "Bali's café culture is one of the best in the world — thoughtfully designed spaces, excellent coffee and slow mornings that set the tone for the whole day. These are the spots I keep coming back to.",
  },
  {
    slug: 'rhodes-itinerary',
    destinationSlug: 'greece',
    category: 'GREECE',
    title: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Best Local Food',
    carouselTitle: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Best Local Food',
    breadcrumbTitle: 'Rhodes Itinerary',
    metaLabel: 'Greece',
    alt: 'Rhodes travel guide',
    image: articleGreece,
    lead: 'Five days on Rhodes, mixing the medieval old town with quiet beaches, island day trips and the kind of local tavernas that make Greek summers unforgettable.',
  },
  {
    slug: 'bruges-guide',
    destinationSlug: 'belgium',
    category: 'BELGIUM',
    title: 'Best Things to Do in Bruges: My Favorite Places, Cafés, Chocolate & Photo Spots',
    carouselTitle: 'Best Things to Do in Bruges: My Favorite Places, Cafés, Chocolate & Photo Spots',
    breadcrumbTitle: 'Bruges Guide',
    metaLabel: 'Belgium',
    alt: 'Bruges travel guide',
    image: articleBruges,
    seoTitle: 'Bruges Travel Guide — Voyaflair',
    seoDescription:
      'Top things to do in Bruges — favorite cafés, chocolate spots, scenic walks, and hidden gems from a personal travel guide.',
  },
] as const;

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articleHref(slug: ArticleSlug): string {
  return pageUrl(`articles/${slug}`);
}

export function articlesForDestination(slug: DestinationSlug) {
  return articles.filter((a) => a.destinationSlug === slug);
}
