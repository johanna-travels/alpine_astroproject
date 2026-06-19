import type { ImageMetadata } from 'astro';
import articleBali from '@/assets/articles/Article Bali.webp';
import articleBruges from '@/assets/articles/Article Bruges.webp';
import articleGreece from '@/assets/articles/Article Greece.webp';
import articleKyoto from '@/assets/articles/Article Kyoto.webp';
import rhodesLcpImage from '@/assets/articles/rhodos-images/rhodes-old-town-cobblestone-street.webp';
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
  publishedDate: string;
  intro: readonly string[];
  lead?: string;
  seoTitle?: string;
  seoDescription?: string;
  lcpImage?: ImageMetadata;
}

export const articles: readonly Article[] = [
  {
    slug: 'kyoto-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Kyoto 3-Day Itinerary for First-Time Visitors',
    carouselTitle: 'Kyoto 3-Day Itinerary for First-Time Visitors',
    breadcrumbTitle: 'Kyoto Itinerary',
    metaLabel: 'Japan',
    alt: 'Kyoto travel guide',
    image: articleKyoto,
    publishedDate: '19 June 2026',
    intro: [
      "Kyoto is one of the most popular destinations in Japan, but it's also much larger than many first-time visitors expect. One of the biggest mistakes people make is trying to fit too much into a short trip, often spending more time moving around the city than actually enjoying it.",
      "While I spent almost a week in Kyoto, I don't think you need seven days to experience the city's highlights. If it's your first visit, three well-planned days are enough to see many of Kyoto's most iconic sights without turning your trip into a race from one attraction to the next.",
      'This itinerary focuses on the places I would personally prioritise on a first visit to Kyoto, combining famous landmarks with a few quieter spots that are easy to overlook on a first visit.',
    ],
    lead: 'A three-day Kyoto itinerary for first-time visitors, combining the city\u2019s most iconic temples and landmarks with a few quieter spots that are easy to overlook.',
  },
  {
    slug: 'bali-cafes',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'Best Cafés in Bali After 2 Months on the Island',
    carouselTitle: 'Best Cafés in Bali After 2 Months on the Island',
    breadcrumbTitle: 'Bali Cafés',
    metaLabel: 'Bali',
    alt: 'Bali cafés guide',
    image: articleBali,
    publishedDate: '18 June 2026',
    intro: [
      'After spending almost two months in Bali, eating out nearly every day became part of my routine. Between cafés, brunch spots, and restaurants, I ended up visiting far more places than I ever expected.',
      "If you've researched Bali before, you've probably come across countless viral cafés on social media. But for a place to make it onto this list, it needed more than just a beautiful setting. Great food, a relaxed atmosphere, and a place I'd genuinely want to return to all mattered just as much.",
      'These are the places that stood out most during my time on the island — from cafés overlooking rice terraces and some of my favourite brunch spots to the restaurant that served the best meal I had in Bali.',
    ],
    lead: "Bali's café culture is one of the best in the world — thoughtfully designed spaces, excellent coffee and slow mornings that set the tone for the whole day. These are the spots I keep coming back to.",
  },
  {
    slug: 'rhodes-itinerary',
    destinationSlug: 'greece',
    category: 'GREECE',
    title: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Local Food Spots',
    carouselTitle: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Local Food Spots',
    breadcrumbTitle: 'Rhodes Itinerary',
    metaLabel: 'Greece',
    alt: 'Rhodes travel guide',
    image: articleGreece,
    publishedDate: '17 June 2026',
    intro: [
      "As the third-largest island in Greece, Rhodes offers far more than beautiful beaches. With its rich history, medieval streets, whitewashed alleys, and countless beaches around the island, it can be surprisingly difficult to decide what to prioritise — especially if it's your first visit.",
      "This itinerary is based on five full days in Rhodes and follows the exact route I took and would happily recommend to first-time visitors. It combines some of the island's most iconic sights with a few personal favourites, while leaving enough room to enjoy each place without feeling like you're constantly rushing from one attraction to the next.",
      "If you're planning your first trip to Rhodes, I hope this itinerary helps you make the most of your time on the island.",
    ],
    lead: 'Five days on Rhodes, mixing the medieval old town with quiet beaches, island day trips and the kind of local tavernas that make Greek summers unforgettable.',
    lcpImage: rhodesLcpImage,
  },
  {
    slug: 'bruges-guide',
    destinationSlug: 'belgium',
    category: 'BELGIUM',
    title: "Best Things to Do in Bruges: A First-Time Visitor's Guide",
    carouselTitle: "Best Things to Do in Bruges: A First-Time Visitor's Guide",
    breadcrumbTitle: 'Bruges Guide',
    metaLabel: 'Belgium',
    alt: 'Bruges travel guide',
    image: articleBruges,
    publishedDate: '16 June 2026',
    intro: [
      'I still remember walking along the cobblestone streets with my suitcase in hand, completely distracted by how beautiful everything felt.',
      "I visited Bruges last winter for my birthday, and I honestly couldn't have picked a better time. The Christmas markets were on, the city had that festive winter atmosphere, and the whole experience felt even more special because of it.",
      'The lights, the canals, the cold air, and those moments of stopping for a hot Belgian chocolate made everything feel incredibly cozy.',
      "In this article, though, I'm not going to focus on the winter or Christmas side of Bruges. Instead, I'm sharing my top 10 things to do in the city — my favorite cafés, chocolate spots, scenic walks, and places that stayed with me long after I left.",
    ],
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
