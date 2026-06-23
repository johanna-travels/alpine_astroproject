import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { getSanityClient } from '@/lib/sanity/client';

export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) throw new Error('Sanity is not configured');
  return imageUrlBuilder(client).image(source);
}

export function sanityImageSrc(source: SanityImageSource, width = 1200): string {
  return urlFor(source).width(width).auto('format').quality(80).url();
}
