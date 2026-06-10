import React, { useState, useEffect } from 'react';

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconType?: 'instagram' | 'pinterest' | 'tiktok';
  variant?: 'nav' | 'social';
}

interface HamburgerMenuOverlayProps {
  items: MenuItem[];
  buttonTop?: string;
  buttonLeft?: string;
  buttonRight?: string;
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
  sm: { button: '40px', icon: '13px' },
  md: { button: '40px', icon: '24px' },
  lg: { button: '64px', icon: '28px' },
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
  buttonTop = '60px',
  buttonLeft,
  buttonRight,
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

  const { button: btnSize } = sizeMap[buttonSize];

  const open = () => {
    setIsOpen(true);
    setTimeout(() => setItemsVisible(true), animationDuration * 300);
    onOpen?.();
  };

  const close = () => {
    setItemsVisible(false);
    setTimeout(() => setIsOpen(false), animationDuration * 500);
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
    <div className={`hamburger-overlay-root ${className}`} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={toggle}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        className={buttonClassName}
        style={{
          ...(isOpen
            ? {
                position: 'fixed' as const,
                top: buttonTop,
                ...(buttonRight ? { right: buttonRight } : { left: buttonLeft ?? '60px' }),
              }
            : { position: 'relative' as const }),
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
            width={sizeMap[buttonSize].icon}
            height={sizeMap[buttonSize].icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.8, transition: `opacity ${animationDuration * 0.2}s` }}
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
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
            {items.filter(item => item.variant !== 'social').map((item, i) => (
              <a
                key={i}
                href={item.href ?? '#'}
                onClick={(e) => {
                  if (!item.href || item.onClick) e.preventDefault();
                  handleItemClick(item);
                }}
                className={menuItemClassName}
                style={{
                  color: textColor,
                  fontSize: fontSizeMap[fontSize],
                  fontFamily,
                  fontWeight: fontWeightMap[fontWeight],
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.4rem 0.5rem',
                  opacity: itemsVisible ? 1 : 0,
                  transform: itemsVisible ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity ${animationDuration * 0.4}s ease ${i * staggerDelay}s, transform ${animationDuration * 0.4}s ease ${i * staggerDelay}s`,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </a>
            ))}
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
                    {item.iconType === 'instagram' && (
                      <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    )}
                    {item.iconType === 'pinterest' && (
                      <svg viewBox="0 0 496 512" width="20" height="20" fill="currentColor"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>
                    )}
                    {item.iconType === 'tiktok' && (
                      <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                    )}
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
