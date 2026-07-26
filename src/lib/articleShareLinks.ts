import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { socialIconPaths } from '@/domains/site/social-icons';
import { socialLinks } from '@/domains/site/social';
import { absoluteUrl, siteOrigin } from '@/lib/site';

const shareIconPaths = {
  facebook: {
    viewBox: '0 0 512 512',
    path: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z',
  },
  x: {
    viewBox: '0 0 512 512',
    path: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88.8h-42.3l255.3 333z',
  },
} as const;

export type ArticleSharePinImage = ImageMetadata;

export interface ArticleShareItem {
  id: string;
  label: string;
  href: string;
  icon: keyof typeof shareIconPaths | 'instagram' | 'pinterest' | 'tiktok';
}

export async function buildArticleShareItems(options: {
  title: string;
  pathname: string;
  pinImage?: ImageMetadata;
}): Promise<readonly ArticleShareItem[]> {
  const shareUrl = absoluteUrl(options.pathname);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(options.title);

  let pinterestHref = `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
  if (options.pinImage) {
    const pinAsset = await getImage({
      src: options.pinImage,
      width: 1200,
      format: 'webp',
      quality: 85,
    });
    const mediaUrl = encodeURIComponent(new URL(pinAsset.src, siteOrigin).href);
    pinterestHref = `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${mediaUrl}&description=${encodedTitle}`;
  }

  const instagram = socialLinks.find((link) => link.icon === 'instagram')!;
  const tiktok = socialLinks.find((link) => link.icon === 'tiktok')!;

  return [
    {
      id: 'facebook',
      label: 'Share on Facebook (opens in new window)',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'facebook',
    },
    {
      id: 'instagram',
      label: instagram.ariaLabel,
      href: instagram.href,
      icon: 'instagram',
    },
    {
      id: 'tiktok',
      label: tiktok.ariaLabel,
      href: tiktok.href,
      icon: 'tiktok',
    },
    {
      id: 'pinterest',
      label: 'Share on Pinterest (opens in new window)',
      href: pinterestHref,
      icon: 'pinterest',
    },
    {
      id: 'x',
      label: 'Share on X (opens in new window)',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: 'x',
    },
  ] as const;
}

export function getShareItemIcon(icon: ArticleShareItem['icon']) {
  if (icon === 'facebook' || icon === 'x') {
    return shareIconPaths[icon];
  }
  return socialIconPaths[icon];
}
