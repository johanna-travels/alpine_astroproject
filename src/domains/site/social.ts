export type SocialIcon = 'instagram' | 'pinterest' | 'tiktok';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
  ariaLabel: string;
}

export const socialLinks: readonly SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/voyaflair',
    icon: 'instagram',
    ariaLabel: 'Voyaflair on Instagram',
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/voyaflair/',
    icon: 'pinterest',
    ariaLabel: 'Voyaflair on Pinterest',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@voyaflair',
    icon: 'tiktok',
    ariaLabel: 'Voyaflair on TikTok',
  },
] as const;
