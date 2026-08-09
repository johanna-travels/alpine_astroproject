import { destinationMatchPaths } from '@/domains/destinations/catalog';
import { pageUrl } from '@/lib/site';
import type { SocialIcon } from '@/domains/site/social';

export interface NavLink {
  label: string;
  href: string;
  match?: string[];
  variant?: 'nav' | 'social';
  iconType?: SocialIcon;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: pageUrl() },
  { label: 'About', href: pageUrl('about') },
  { label: 'Services', href: pageUrl('services') },
  {
    label: 'Destinations',
    href: pageUrl('destinations'),
    match: destinationMatchPaths(),
  },
  { label: 'Contact', href: pageUrl('contact') },
];

export const footerLegalLinks: FooterLegalLink[] = [
  { label: 'Privacy Policy', href: pageUrl('privacy-policy') },
  { label: 'Cookie Policy', href: pageUrl('cookie-policy') },
  { label: 'Terms & Conditions', href: pageUrl('terms') },
  { label: 'Affiliate Disclosure', href: pageUrl('affiliate') },
];
