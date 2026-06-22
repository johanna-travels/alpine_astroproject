import React, { useState, useEffect, useRef } from 'react';
import { isActivePath } from '@/lib/site';
import type { SocialIcon as SocialIconName } from '@/domains/site/social';
import { SocialIcon } from '@/components/ui/SocialIcon';

export interface MenuItem {
  label: string;
  href?: string;
  match?: string[];
  onClick?: () => void;
  icon?: React.ReactNode;
  iconType?: SocialIconName;
  variant?: 'nav' | 'social';
}

interface HamburgerMenuOverlayProps {
  items: MenuItem[];
  activePathname?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonColor?: string;
  iconColor?: string;
  overlayBackground?: string;
  textColor?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontFamily?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  animationDuration?: number;
  staggerDelay?: number;
  menuAlignment?: 'left' | 'center' | 'right';
  menuDirection?: 'vertical' | 'horizontal';
  enableBlur?: boolean;
  keepOpenOnItemClick?: boolean;
  customButton?: React.ReactNode;
  ariaLabel?: string;
  onOpen?: () => void;
  onClose?: () => void;
  zIndex?: number;
  className?: string;
  buttonClassName?: string;
  menuItemClassName?: string;
}

const sizeMap = {
  sm: { button: '50px', icon: '40px' },
  md: { button: '60px', icon: '50px' },
  lg: { button: '80px', icon: '60px' },
};

const fontSizeMap = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.75rem',
  xl: '2.25rem',
  '2xl': '3rem',
};

const fontWeightMap = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export function HamburgerMenuOverlay({
  items,
  activePathname = '',
  buttonSize = 'md',
  buttonColor = '#6c8cff',
  iconColor = '#ffffff',
  overlayBackground = '#6c8cff',
  textColor = '#ffffff',
  fontSize = 'lg',
  fontFamily = '"Krona One", monospace',
  fontWeight = 'bold',
  animationDuration = 1.5,
  staggerDelay = 0.1,
  menuAlignment = 'left',
  menuDirection = 'vertical',
  enableBlur = false,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = 'Navigation menu',
  onOpen,
  onClose,
  zIndex = 1000,
  className = '',
  buttonClassName = '',
  menuItemClassName = '',
}: HamburgerMenuOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const { button: btnSize } = sizeMap[buttonSize];

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  useEffect(() => () => clearTimers(), []);

  const open = () => {
    clearTimers();
    setIsOpen(true);
    schedule(() => setItemsVisible(true), animationDuration * 300);
    onOpen?.();
  };

  const close = () => {
    clearTimers();
    setItemsVisible(false);
    schedule(() => setIsOpen(false), animationDuration * 500);
    onClose?.();
  };

  const toggle = () => (isOpen ? close() : open());

  const handleItemClick = (item: MenuItem) => {
    item.onClick?.();
    if (!keepOpenOnItemClick) close();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <div
      className={`hamburger-overlay-root ${className}`}
      style={{
        position: 'relative',
        width: btnSize,
        height: btnSize,
        flexShrink: 0,
        zIndex: isOpen ? zIndex + 1 : undefined,
      }}
    >
      {/* Trigger button — stays in document flow to avoid nav layout shift */}
      <button
        onClick={toggle}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        className={buttonClassName}
        style={{
          position: 'relative',
          width: btnSize,
          height: btnSize,
          borderRadius: '50%',
          background: buttonColor,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: zIndex + 1,
          boxShadow: buttonColor === 'transparent' ? 'none' : '0 4px 20px rgba(0,0,0,0.18)',
          transition: `transform ${animationDuration * 0.3}s ease`,
          transform: isOpen ? 'rotate(90deg) scale(1.08)' : 'rotate(0deg) scale(1)',
        }}
      >
        {customButton ?? (
          <svg
            width="33"
            height="33"
            viewBox="0 0 264 258.74999"
            fill="none"
            style={{ opacity: 0.8, transition: `opacity ${animationDuration * 0.2}s` }}
          >
            {isOpen ? (
              <>
                <path fill={iconColor} d="M 213.589844 218.605469 C 211.691406 218.605469 209.792969 217.878906 208.34375 216.433594 L 45.207031 53.292969 C 42.308594 50.394531 42.308594 45.707031 45.207031 42.808594 C 48.109375 39.910156 52.792969 39.910156 55.695312 42.808594 L 218.832031 205.949219 C 221.730469 208.847656 221.730469 213.535156 218.832031 216.433594 C 217.386719 217.878906 215.488281 218.605469 213.589844 218.605469 Z" fillOpacity="1" fillRule="nonzero"/>
                <path fill={iconColor} d="M 50.449219 218.605469 C 48.554688 218.605469 46.65625 217.878906 45.207031 216.433594 C 42.308594 213.535156 42.308594 208.847656 45.207031 205.949219 L 208.34375 42.808594 C 211.246094 39.910156 215.929688 39.910156 218.832031 42.808594 C 221.730469 45.707031 221.730469 50.394531 218.832031 53.292969 L 55.695312 216.433594 C 54.246094 217.878906 52.351562 218.605469 50.449219 218.605469 Z" fillOpacity="1" fillRule="nonzero"/>
              </>
            ) : (
              <>
                <path fill={iconColor} d="M 8.496094 63.1875 L 255.503906 63.1875 C 258.953125 63.1875 261.25 60.890625 261.25 57.445312 C 261.25 53.996094 258.953125 51.699219 255.503906 51.699219 L 8.496094 51.699219 C 5.046875 51.699219 2.75 53.996094 2.75 57.445312 C 2.75 60.890625 5.621094 63.1875 8.496094 63.1875 Z M 8.496094 63.1875 " fillOpacity="1" fillRule="nonzero"/>
                <path fill={iconColor} d="M 255.503906 123.503906 L 8.496094 123.503906 C 5.046875 123.503906 2.75 125.804688 2.75 129.25 C 2.75 132.695312 5.046875 134.996094 8.496094 134.996094 L 255.503906 134.996094 C 258.953125 134.996094 261.25 132.695312 261.25 129.25 C 261.25 125.804688 258.378906 123.503906 255.503906 123.503906 Z M 255.503906 123.503906 " fillOpacity="1" fillRule="nonzero"/>
                <path fill={iconColor} d="M 255.503906 195.3125 L 8.496094 195.3125 C 5.046875 195.3125 2.75 197.609375 2.75 201.054688 C 2.75 204.503906 5.046875 206.800781 8.496094 206.800781 L 255.503906 206.800781 C 258.953125 206.800781 261.25 204.503906 261.25 201.054688 C 261.25 197.609375 258.378906 195.3125 255.503906 195.3125 Z M 255.503906 195.3125 " fillOpacity="1" fillRule="nonzero"/>
              </>
            )}
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: overlayBackground,
            backdropFilter: enableBlur ? 'blur(12px)' : 'none',
            zIndex: zIndex,
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              menuAlignment === 'center' ? 'center' : menuAlignment === 'right' ? 'flex-end' : 'flex-start',
            padding: '0 8vw',
            animation: `overlayIn ${animationDuration * 0.6}s cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              alignItems: menuAlignment === 'center' ? 'center' : menuAlignment === 'right' ? 'flex-end' : 'flex-start',
            }}
          >
            {items.filter(item => item.variant !== 'social').map((item, i) => {
              const isActive = Boolean(
                activePathname &&
                item.href &&
                isActivePath(activePathname, [item.href, ...(item.match ?? [])])
              );

              return (
              <a
                key={i}
                href={item.href ?? '#'}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  if (!item.href) e.preventDefault();
                  handleItemClick(item);
                }}
                className={menuItemClassName}
                style={{
                  color: textColor,
                  fontSize: fontSizeMap[fontSize],
                  fontFamily,
                  fontWeight: isActive ? 600 : fontWeightMap[fontWeight],
                  textDecoration: isActive ? 'underline' : 'none',
                  textUnderlineOffset: '0.35em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.4rem 0.5rem',
                  opacity: itemsVisible ? (isActive ? 1 : 0.72) : 0,
                  transform: itemsVisible ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity ${animationDuration * 0.4}s ease ${i * staggerDelay}s, transform ${animationDuration * 0.4}s ease ${i * staggerDelay}s`,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </a>
            )})}
            {items.some(item => item.variant === 'social') && (
              <div style={{
                display: 'flex',
                gap: '1.25rem',
                marginTop: '1.5rem',
                paddingLeft: '0.5rem',
                opacity: itemsVisible ? 1 : 0,
                transition: `opacity ${animationDuration * 0.4}s ease ${items.filter(i => i.variant !== 'social').length * staggerDelay + 0.1}s`,
              }}>
                {items.filter(item => item.variant === 'social').map((item, i) => (
                  <a key={i} href={item.href ?? '#'} target="_blank" rel="noopener noreferrer"
                    aria-label={item.label}
                    style={{ color: textColor, opacity: 0.6, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                  >
                    {item.icon ?? (item.iconType ? <SocialIcon icon={item.iconType} /> : null)}
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes overlayIn {
          from { clip-path: circle(0% at 5% 8%); opacity: 0.6; }
          to   { clip-path: circle(150% at 5% 8%); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
