import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Shared responsive image settings for article content */
export const articleImageWidths = [400, 768, 1200] as const;
export const articleImageSizes = '(max-width: 768px) 100vw, 768px';

export const bentoImageWidths = [400, 600, 900] as const;
export const bentoImageSizes = '(max-width: 768px) 100vw, 50vw';

export const heroImageWidths = [640, 960, 1200, 1800] as const;
export const heroImageSizes = '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1300px';

export const heroImageOptions = {
  width: 1800,
  format: 'webp' as const,
  quality: 75,
};

export const cardImageWidths = [320, 400, 480, 640] as const;
export const cardImageSizes = '(min-width: 1024px) 33vw, (min-width: 640px) 40vw, 100vw';
export const cardImageQuality = 70;

export async function getHeroImage(src: ImageMetadata) {
  return getImage({ src, ...heroImageOptions });
}

export async function getResponsiveHero(src: ImageMetadata) {
  const srcSet = await buildResponsiveSrcSet(src, heroImageWidths);
  const fallback = await getImage({ src, width: heroImageWidths[0], format: 'webp', quality: 75 });
  const large = await getImage({ src, ...heroImageOptions });
  return {
    src: fallback.src,
    largeSrc: large.src,
    srcSet,
    sizes: heroImageSizes,
  };
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

export async function buildArticleLcpSrcSet(src: ImageMetadata) {
  return buildResponsiveSrcSet(src, articleImageWidths);
}
