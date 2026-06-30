import type { ImageMetadata } from 'astro';
import articleBali from '@/assets/articles/cards/bali.webp';
import articleBaliBelly from '@/assets/articles/bali/bali.belly.article.webp';
import articleBaliTips from '@/assets/articles/bali/bali-travel-tips.webp';
import articleBruges from '@/assets/articles/cards/bruges.webp';
import articleGreece from '@/assets/articles/cards/greece.webp';
import articleHongKong from '@/assets/articles/hong-kong/hong-kong.webp';
import articleKyoto from '@/assets/articles/cards/kyoto.webp';
import articleNara from '@/assets/articles/kyoto/nara-the-famous-bow.webp';
import articleKatsuoji from '@/assets/articles/osaka/katsuoji-temple.webp';
import articleKatsuojiSpring from '@/assets/articles/osaka/spring-colours-at-katsuoji-temple.webp';
import articleOsaka from '@/assets/articles/osaka/namba-yasaka.webp';
import rhodesLcpImage from '@/assets/articles/rhodes/rhodes-old-town-cobblestone-street.webp';
import articleParga from '@/assets/articles/parga/parga-from-above.webp';
import type { DestinationSlug } from '@/domains/destinations/catalog';
import { pageUrl } from '@/lib/site';

export type ArticleSlug = 'bali-cafes' | 'bali-belly' | 'bali-travel-tips' | 'bruges-guide' | 'hong-kong-first-trip' | 'katsuoji-temple-from-osaka' | 'kyoto-itinerary' | 'nara-day-trip-from-kyoto' | 'osaka-1-day-itinerary' | 'parga-1-day' | 'rhodes-itinerary';

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
  dateLabel?: string;
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
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "Kyoto is one of Japan's most rewarding cities to explore, but it's also much larger than many first-time visitors expect. Trying to see everything in just a couple of days usually means spending more time travelling between attractions than actually enjoying them.",
      "I spent five days in Kyoto, but if I were planning my first trip again, I'd dedicate three full days to the city. That's enough time to visit many of Kyoto's most famous sights while still leaving room to slow down and enjoy the places in between.",
      "This is the exact route I'd recommend for a first visit to Kyoto. It combines iconic landmarks with a few quieter places that ended up becoming some of my favourite memories from the trip. And if you're still planning your visit, I'd also recommend having a look at the <a href='#section-5' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the questions I wish I'd known the answers to before arriving in Kyoto.",
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
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're visiting Kyoto for the first time, Nara is one of the easiest and most rewarding day trips you can add to your itinerary. Located less than an hour away by train, it's best known for its free-roaming deer, historic temples and peaceful parks, making it a completely different experience from Kyoto.",
      "Most people, myself included, first become interested in Nara because of the famous deer. But once I arrived, I quickly realised Nara had much more to offer than just its famous deer. During my visit, I watched the famous mochi-pounding show, wandered through a traditional Japanese garden, explored Todai-ji Temple and spent time with the deer in different parts of Nara Park.",
      "If you're following my <a href='/articles/kyoto-itinerary/' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>Kyoto 3-Day Itinerary</a>, this is the exact route I'd recommend for your day trip to Nara, along with a few practical tips I wish I'd known before visiting.",
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
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're visiting Japan for the first time, Osaka is a city that's well worth adding to your itinerary. Known for its incredible food, lively neighbourhoods and bright neon lights, it offers a completely different experience from both Tokyo and Kyoto.",
      "While I spent more than one day in Osaka, this is the itinerary I'd recommend if you only have one day to explore. It combines one of the city's most unique shrines, my favourite day trip from Osaka, a couple of memorable food stops and an evening in Dotonbori.",
      "If you're looking for a mix of iconic sights, local food and a slightly different side of Osaka, this itinerary is a great place to start.",
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
    slug: 'bali-belly',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'Bali Belly: What It Is, My Experience & Recovery',
    carouselTitle: 'Bali Belly: What It Is, My Experience & Recovery',
    breadcrumbTitle: 'Bali Belly',
    metaLabel: 'Bali',
    alt: 'Bali Belly: What It Is, My Experience & Recovery',
    image: articleBaliBelly,
    publishedDate: '26 June 2026',
    intro: [
      "Before travelling to Bali, I'd heard plenty of stories about Bali Belly, but I never expected to experience it myself.",
      "Bali Belly is the common name for traveller's diarrhoea that affects some visitors to Bali. It's usually caused by bacteria, viruses, or parasites found in contaminated food or water.",
      'In most cases, symptoms last between one and three days and improve with rest, proper hydration, and the right treatment. However, if your symptoms last longer than three days, become severe, or you struggle to stay hydrated, it is important to seek medical attention.',
    ],
    lead: 'My honest experience with Bali Belly — what it is, the symptoms I had, and what actually helped me recover.',
  },
  {
    slug: 'bali-travel-tips',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'What to Know Before Travelling to Bali',
    carouselTitle: 'What to Know Before Travelling to Bali',
    breadcrumbTitle: 'Bali Travel Tips',
    metaLabel: 'Bali',
    alt: 'What to Know Before Travelling to Bali',
    image: articleBaliTips,
    publishedDate: '26 June 2026',
    intro: [
      "I spent almost two months travelling around Bali, and by the end of my trip there were a few things I was really glad I'd done.",
      "In this guide, I'll share a few practical tips that I think are worth knowing before travelling to Bali, from getting your Visa on Arrival and choosing an eSIM to the travel essentials I always pack and a few things I'd do exactly the same way again.",
    ],
    lead: 'A few practical tips worth knowing before travelling to Bali — from your Visa on Arrival and eSIM to the travel essentials I always pack.',
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
    publishedDate: '30 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're looking for a Greek island that combines history, beaches and great food, Rhodes is hard to beat. I was surprised to learn it's the third-largest island in Greece, and after spending five days there, it finally made sense why so many people return more than once.",
      "I spent five days exploring the island, and this is the exact route I'd recommend if I were planning the trip again. It includes the places I believe every first-time visitor should see, while leaving plenty of reasons to come back.",
      "Before you start planning your trip, I'd also recommend checking the <a href='#section-6' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the most common questions about visiting Rhodes.",
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
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "Parga is one of the most beautiful seaside towns in Greece, known for its colourful houses, crystal-clear beaches and the Venetian Castle overlooking the harbour. Although it's located on the mainland, it has an island-like atmosphere that makes it feel unlike anywhere else in Epirus.",
      "I've visited Parga twice so far. The first time, I spent four days exploring the town at a relaxed pace, while my second visit was a day trip from Preveza. Both trips were completely different, but they confirmed one thing—Parga is still one of my favourite places in Greece.",
      "If you only have one day to explore, this is the itinerary I'd recommend. It includes some of my favourite places for breakfast, sightseeing, swimming and dinner, along with a few tips I picked up during my visits.",
    ],
    lead: 'A relaxed one-day guide to Parga, from its hillside old town to the beaches below the Venetian castle.',
  },
  {
    slug: 'hong-kong-first-trip',
    destinationSlug: 'hong-kong',
    category: 'HONG KONG',
    title: "Places You Shouldn't Miss on Your First Trip to Hong Kong",
    carouselTitle: "Places You Shouldn't Miss on Your First Trip to Hong Kong",
    breadcrumbTitle: 'First Trip to Hong Kong',
    metaLabel: 'Hong Kong',
    alt: 'Hong Kong travel guide',
    image: articleHongKong,
    publishedDate: '30 June 2026',
    intro: [
      "Hong Kong is one of the most unique cities I've ever visited. Although it's part of China, its history has created a fascinating blend of Eastern traditions and Western influences that you notice almost everywhere. Towering skyscrapers stand next to traditional temples, historic trams pass through busy streets, and peaceful gardens offer a quiet escape from the city's fast pace. It's this contrast between old and new that makes Hong Kong feel unlike anywhere else.",
      "In this guide, I've included the places I highly recommend to anyone planning their first trip to the city. You'll also find a map below with all the places mentioned in this guide, along with a few hotel recommendations.",
      "I stayed at Novotel Century Hong Kong and found it to be a great base for exploring the city. Getting there from the airport was easy with a direct bus, and both the MTR and the tram were just a short walk away. One of the things that impressed me most about Hong Kong was how easy it was to get around thanks to its excellent public transport system.",
      "Before you leave, don't miss the <a href='#section-10' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the most common questions about visiting Hong Kong.",
    ],
    lead: 'A first-timer\u2019s guide to Hong Kong, from skyline views over Victoria Harbour to markets, temples and unforgettable food.',
    seoTitle: 'Hong Kong Travel Guide — Voyaflair',
    seoDescription:
      "The places you shouldn't miss on your first trip to Hong Kong — skyline views, markets, temples and local food from a personal travel guide.",
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
    publishedDate: '28 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "Bruges is one of the most beautiful medieval cities I've visited in Europe. With its charming canals, historic buildings, cobblestone streets, and peaceful atmosphere, it's easy to see why it's often called the \"Venice of the North.\" Whether you're visiting for a day or spending a weekend here, Bruges is a city that's best explored on foot.",
      "In this guide, I've included the places I highly recommend visiting if it's your first time in Bruges. You'll also find a map below with all the places mentioned in this guide, along with extra restaurant recommendations, waffle shops, cafés, and a selection of hotels and B&Bs to make planning your trip even easier.",
      "Before you leave, don't miss the <a href='#section-11' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the most common questions about visiting Bruges.",
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
