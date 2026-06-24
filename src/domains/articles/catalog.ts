import type { ImageMetadata } from 'astro';
import articleBali from '@/assets/articles/Article Bali.webp';
import articleBruges from '@/assets/articles/Article Bruges.webp';
import articleGreece from '@/assets/articles/Article Greece.webp';
import articleKyoto from '@/assets/articles/Article Kyoto.webp';
import articleNara from '@/assets/articles/kyoto/nara-the-famous-bow.webp';
import articleKatsuoji from '@/assets/articles/osaka/katsuoji-temple.webp';
import articleKatsuojiSpring from '@/assets/articles/osaka/spring-colours-at-katsuoji-temple.webp';
import articleOsaka from '@/assets/articles/osaka/namba-yasaka.webp';
import rhodesLcpImage from '@/assets/articles/rhodos-images/rhodes-old-town-cobblestone-street.webp';
import articleParga from '@/assets/parga/parga-from-above.webp';
import type { DestinationSlug } from '@/domains/destinations/catalog';
import { pageUrl } from '@/lib/site';

export type ArticleSlug = 'bali-cafes' | 'bruges-guide' | 'katsuoji-temple-from-osaka' | 'kyoto-itinerary' | 'nara-day-trip-from-kyoto' | 'osaka-1-day-itinerary' | 'parga-1-day' | 'rhodes-itinerary';

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
    lead: 'Five days in Kyoto, balancing iconic temples with quiet neighbourhoods, slow mornings and the kind of details that make the city stay with you.',
  },
  {
    slug: 'nara-day-trip-from-kyoto',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Nara Day Trip from Kyoto: Deer, Temples & Tips for First-Time Visitors',
    carouselTitle: 'Nara Day Trip from Kyoto: Deer, Temples & Tips for First-Time Visitors',
    breadcrumbTitle: 'Nara Day Trip',
    metaLabel: 'Japan',
    alt: 'Nara day trip travel guide',
    image: articleNara,
    publishedDate: '20 June 2026',
    intro: [
      "If you're visiting Kyoto for the first time, Nara is one of the easiest day trips you can add to your itinerary.",
      'Most people, myself included, first become interested in Nara because of the famous deer that roam freely around Nara Park. But once you arrive, you quickly realise there is more to the area than just feeding the deer.',
      'During my visit, I stopped for freshly made mochi, walked through a peaceful Japanese garden, explored the area around Todai-ji Temple, and spent time with the deer in different parts of the park. This guide follows the route I personally took and includes a few practical tips I wish I had known before visiting.',
    ],
    lead: "If you're visiting Kyoto for the first time, Nara is one of the easiest day trips you can add to your itinerary.",
  },
  {
    slug: 'katsuoji-temple-from-osaka',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Katsuoji Temple from Osaka: What to Know Before You Go',
    carouselTitle: 'Katsuoji Temple from Osaka: What to Know Before You Go',
    breadcrumbTitle: 'Katsuoji Temple',
    metaLabel: 'Japan',
    alt: 'Katsuoji Temple travel guide',
    image: articleKatsuojiSpring,
    publishedDate: '22 June 2026',
    intro: [
      "If you search for day trips from Osaka, you'll probably come across Katsuoji Temple and its thousands of daruma dolls. What I didn't expect was for it to become one of my favourite experiences in Japan.",
      'Located in the hills north of Osaka, Katsuoji is a Buddhist temple best known for its daruma dolls, which are associated with perseverance, good luck, and achieving personal goals. Today, thousands of daruma can be found throughout the temple grounds, making it one of the most distinctive temples in Japan.',
      "In this guide, I'll share what to expect from a visit to Katsuoji Temple, how to get there from Osaka, the unique stamp card experience, and a few practical tips I wish I had known before visiting.",
    ],
    lead: 'Katsuoji Temple is a Buddhist temple in the hills north of Osaka, famous for the thousands of daruma dolls scattered across its peaceful grounds.',
  },
  {
    slug: 'osaka-1-day-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Osaka 1-Day Itinerary',
    carouselTitle: 'Osaka 1-Day Itinerary',
    breadcrumbTitle: 'Osaka Itinerary',
    metaLabel: 'Japan',
    alt: 'Osaka itinerary travel guide',
    image: articleOsaka,
    publishedDate: '23 June 2026',
    intro: [
      'Osaka is often known for its neon lights, street food, and lively atmosphere, but some of my favourite memories from the city came from places that felt completely different.',
      'While I spent more than one day in Osaka, this is the itinerary I would recommend if you only have one day to explore. It combines one of the city\'s most unique shrines, my favourite day trip from Osaka, a couple of memorable food stops, and an evening in the bright lights of Dotonbori.',
      "If you're looking for a mix of iconic sights, local food, and a slightly different side of Osaka, this itinerary is a great place to start.",
    ],
    lead: 'A relaxed one-day Osaka itinerary combining a peaceful morning shrine with the daruma-filled grounds of Katsuoji Temple.',
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
    slug: 'parga-1-day',
    destinationSlug: 'greece',
    category: 'GREECE',
    title: 'How to spend 1 day in Parga',
    carouselTitle: 'How to spend 1 day in Parga',
    breadcrumbTitle: 'Parga in 1 Day',
    metaLabel: 'Greece',
    alt: 'Parga travel guide',
    image: articleParga,
    publishedDate: '24 June 2026',
    intro: [
      "I've visited Parga twice so far. The first time I spent four days here enjoying a slower pace of travel, while the second time I visited as a day trip from Preveza.",
      "It's still one of my favourite places in Greece. With beautiful beaches, colourful streets, and a rich history, it offers a combination that's hard to find elsewhere on the Greek mainland.",
      "In this guide, I'll share how I would spend one day in Parga, including some of my favourite spots for breakfast, sightseeing, swimming, and dinner.",
    ],
    lead: 'A relaxed one-day guide to Parga, from its hillside old town to the beaches below the Venetian castle.',
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
