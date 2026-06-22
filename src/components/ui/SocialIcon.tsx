import type { SocialIcon as SocialIconName } from '@/domains/site/social';
import { socialIconPaths } from '@/domains/site/social-icons';

interface SocialIconProps {
  icon: SocialIconName;
  size?: number;
  className?: string;
}

export function SocialIcon({ icon, size = 20, className }: SocialIconProps) {
  const { viewBox, path } = socialIconPaths[icon];

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
