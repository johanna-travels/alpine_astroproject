import type { ImageMetadata } from 'astro';
import baliHero from '@/assets/heroes/destination-bali.webp';
import belgiumHero from '@/assets/heroes/destination-belgium.webp';
import franceHero from '@/assets/heroes/destination-france.webp';
import greeceHero from '@/assets/heroes/destination-greece.webp';
import japanHero from '@/assets/heroes/destination-japan.webp';
import hongKongHero from '@/assets/articles/hong-kong/hong-kong-victoria.webp';
import norwayHero from '@/assets/articles/norway/norway.webp';
import scotlandHero from '@/assets/articles/edinburgh/calton-hill-scotland.webp';
import thailandHero from '@/assets/heroes/destination-thailand.webp';
import { pageUrl } from '@/lib/site';

export type DestinationSlug = 'bali' | 'belgium' | 'france' | 'greece' | 'hong-kong' | 'japan' | 'norway' | 'scotland' | 'thailand';

export interface Destination {
  slug: DestinationSlug;
  name: string;
  region: string;
  cardDescription: string;
  description: string;
  heroImage: ImageMetadata;
  seoTitle: string;
  seoDescription: string;
  /** Set to false to keep this destination off the homepage grid (still listed on the full Destinations page and reachable via its own URL). Defaults to true. */
  featured?: boolean;
}

export const destinations: readonly Destination[] = [
  {
    slug: 'bali',
    name: 'Bali',
    region: 'Indonesia',
    cardDescription: 'Tropical paradise with stunning beaches and vibrant culture',
    description:
      'Bali moves between calm mornings, busy streets and quiet pockets of nature in a way that feels constant but never repetitive. My time there has been mostly centered around cafés, beaches and smaller local spots that shape how I experienced the island. This page gathers guides and travel notes from Bali.',
    heroImage: baliHero,
    seoTitle: 'Bali — Voyaflair',
    seoDescription:
      'Travel guides and notes from Bali — cafés, beaches, nature and quiet local spots worth discovering.',
  },
  {
    slug: 'belgium',
    name: 'Belgium',
    region: 'Europe',
    cardDescription: 'Medieval charm and culinary delights',
    description:
      "Medieval towns, grand squares, impressive architecture, and cozy cafés — Belgium has plenty to explore. Here, you'll find travel guides, itineraries, insider tips, and practical advice to help you plan your trip and discover more of what the country has to offer.",
    heroImage: belgiumHero,
    seoTitle: 'Belgium — Voyaflair',
    seoDescription:
      'Travel guides and notes from Belgium — medieval Bruges, canals, chocolate, and quiet corners worth discovering.',
  },
  {
    slug: 'france',
    name: 'France',
    region: 'Europe',
    cardDescription: 'Romantic charm, iconic landmarks and festive magic',
    description:
      "France is a country that never really lets me go, especially when it comes to Paris. My time there has been shaped by cozy cafés, iconic landmarks and a particular soft spot for experiencing the city during the Christmas season. This page focuses mainly on Paris for now, with more destinations coming as I continue exploring the country.",
    heroImage: franceHero,
    seoTitle: 'France — Voyaflair',
    seoDescription:
      'Travel guides and notes from France — Paris at Christmas, iconic landmarks, and festive magic worth experiencing.',
  },
  {
    slug: 'greece',
    name: 'Greece',
    region: 'Europe',
    cardDescription: 'Ancient history meets crystal clear waters',
    description:
      'Greece is a place where every region feels like a different world, from the energy of Athens to the slower rhythm of the islands and smaller coastal towns. My travels here have been a mix of well-known destinations and quieter places that often leave the strongest impression. This page brings together guides and itineraries from across the country.',
    heroImage: greeceHero,
    seoTitle: 'Greece — Voyaflair',
    seoDescription:
      'Travel guides and notes from Greece — islands, history, and local food worth remembering.',
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    region: 'Asia',
    cardDescription: 'Where skyline views meet buzzing street life',
    description:
      'Hong Kong moves between towering skylines, busy harbors, and quiet corners tucked away from the crowds. From the views over Victoria Harbour to its street markets, temples, and food scene, the city packs an incredible amount into a small space.',
    heroImage: hongKongHero,
    seoTitle: 'Hong Kong — Voyaflair',
    seoDescription:
      'Travel guides and notes from Hong Kong — skyline views, harbour walks, markets, and local food worth discovering.',
  },
  {
    slug: 'japan',
    name: 'Japan',
    region: 'Asia',
    cardDescription: 'Where tradition meets modern innovation',
    description:
      'Japan shifts between fast-paced cities, quiet temples and highly structured everyday life, creating a contrast that stays with you in every place you visit. From Tokyo to Kyoto and Osaka, my travels across these cities come together through different experiences, guides and itineraries shared here.',
    heroImage: japanHero,
    seoTitle: 'Japan — Voyaflair',
    seoDescription:
      'Travel guides and notes from Japan — Kyoto, tradition, and places worth slowing down for.',
  },
  {
    slug: 'norway',
    name: 'Norway',
    region: 'Europe',
    cardDescription: 'Dramatic fjords, northern lights and quiet mountain towns',
    description:
      "Dramatic fjords, mountain landscapes, colorful waterfronts, and cities surrounded by nature — Norway has a little bit of everything, from vibrant city life to some of Europe's most striking natural scenery.",
    heroImage: norwayHero,
    seoTitle: 'Norway — Voyaflair',
    seoDescription:
      'Travel guides and notes from Norway — fjords, mountain towns, and landscapes worth slowing down for.',
  },
  {
    slug: 'scotland',
    name: 'Scotland',
    region: 'Europe',
    cardDescription: 'Historic streets, dramatic landscapes and unforgettable city views',
    description:
      'From Edinburgh’s historic streets to dramatic Highland landscapes, Scotland offers a mix of culture, architecture and scenery. This page brings together travel guides and notes from Scotland, starting with Edinburgh.',
    heroImage: scotlandHero,
    seoTitle: 'Scotland — Voyaflair',
    seoDescription:
      'Travel guides and notes from Scotland — Edinburgh, historic streets, city views and landscapes worth discovering.',
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    region: 'Asia',
    cardDescription: 'Golden temples, bustling markets and laid-back island life',
    description:
      "Temples, night markets, rooftop views, and tropical islands — Thailand has plenty to spark your wanderlust. Here, you'll find travel guides, itineraries, insider tips, and practical things to know before your trip, starting with Bangkok and hopefully many more places to come.",
    heroImage: thailandHero,
    seoTitle: 'Thailand — Voyaflair',
    seoDescription:
      'Travel guides and notes from Thailand — temples, markets, and island life worth experiencing.',
  },
] as const;

export const destinationSlugs = destinations.map((d) => d.slug);

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function destinationHref(slug: DestinationSlug): string {
  return pageUrl(slug);
}

export function destinationMatchPaths(): string[] {
  return [pageUrl('articles'), ...destinationSlugs.map((slug) => pageUrl(slug))];
}
