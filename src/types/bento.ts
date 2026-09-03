import type { ImageMetadata } from 'astro';

export type BentoMediaItem =
  | {
      kind: 'image';
      src: ImageMetadata;
      alt: string;
      title?: string;
      description?: string;
    }
  | {
      kind: 'video';
      src: string;
      alt: string;
      title?: string;
      poster?: ImageMetadata;
    }
  | {
      kind: 'instagram';
      permalink?: string;
      poster: ImageMetadata;
      alt: string;
      title?: string;
    };
