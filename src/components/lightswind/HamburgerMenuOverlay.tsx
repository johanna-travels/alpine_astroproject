import React, { useState, useEffect } from 'react';

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
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
  md: { button: '52px', icon: '22px' },
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
          position: 'fixed',
          top: buttonTop,
          ...(buttonRight ? { right: buttonRight } : { left: buttonLeft ?? '60px' }),
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
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transition: `opacity ${animationDuration * 0.2}s` }}
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
              flexDirection: menuDirection === 'horizontal' ? 'row' : 'column',
              gap: menuDirection === 'horizontal' ? '2.5rem' : '0.25rem',
              alignItems:
                menuAlignment === 'center' ? 'center' : menuAlignment === 'right' ? 'flex-end' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {items.map((item, i) => (
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
                  padding: '0.6rem 0.5rem',
                  opacity: itemsVisible ? 1 : 0,
                  transform: itemsVisible ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity ${animationDuration * 0.4}s ease ${i * staggerDelay}s, transform ${animationDuration * 0.4}s ease ${i * staggerDelay}s`,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {item.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                {item.label}
              </a>
            ))}
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
