import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Shared responsive image settings for article content */
export const articleImageWidths = [400, 768, 1200] as const;
export const articleImageSizes = '(max-width: 768px) 100vw, 768px';

export const bentoImageWidths = [400, 600, 900] as const;
export const bentoImageSizes = '(max-width: 768px) 100vw, 50vw';

export const heroImageOptions = {
  width: 1800,
  format: 'webp' as const,
  quality: 75,
};

export const cardImageWidths = [320, 480, 640, 900] as const;
export const cardImageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

export async function getHeroImage(src: ImageMetadata) {
  return getImage({ src, ...heroImageOptions });
}

export async function buildResponsiveSrcSet(
  src: ImageMetadata,
  widths: readonly number[] = cardImageWidths
) {
  const variants = await Promise.all(
    widths.map((width) => getImage({ src, width, format: 'webp', quality: 75 }))
  );
  return variants.map((variant, index) => `${variant.src} ${widths[index]}w`).join(', ');
}
