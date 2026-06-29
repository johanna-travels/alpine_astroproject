import type { ImageMetadata } from 'astro';
import baliHero from '@/assets/heroes/destination-bali.webp';
import belgiumHero from '@/assets/heroes/destination-belgium.webp';
import greeceHero from '@/assets/heroes/destination-greece.webp';
import japanHero from '@/assets/heroes/destination-japan.webp';
import hongKongHero from '@/assets/articles/hong-kong/hong-kong-victoria.webp';
import { pageUrl } from '@/lib/site';

export type DestinationSlug = 'bali' | 'belgium' | 'greece' | 'hong-kong' | 'japan';

export interface Destination {
  slug: DestinationSlug;
  name: string;
  region: string;
  cardDescription: string;
  description: string;
  heroImage: ImageMetadata;
  seoTitle: string;
  seoDescription: string;
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
      'Belgium is a country of contrasts, where languages, culture and architecture shift noticeably from one region to another. My experience so far has been focused on Bruges, a city defined by its canals and medieval streets, with a slower rhythm that feels removed from bigger cities. This page focuses mainly on Bruges for now, with more destinations coming as I continue exploring the country.',
    heroImage: belgiumHero,
    seoTitle: 'Belgium — Voyaflair',
    seoDescription:
      'Travel guides and notes from Belgium — medieval Bruges, canals, chocolate, and quiet corners worth discovering.',
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
      'Hong Kong moves between towering skylines, busy harbours and quiet corners tucked away from the crowds. From the views over Victoria Harbour to its markets, temples and food, the city packs an incredible amount into a small space. This page gathers guides and travel notes from Hong Kong.',
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
