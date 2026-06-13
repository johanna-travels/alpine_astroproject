import React, { useCallback, useEffect, useState } from 'react';

interface CarouselDotsProps {
  carouselId: string;
  count: number;
  gap?: number;
  dotColor?: string;
  activeColor?: string;
  verticalOffset?: string;
}

export default function CarouselDots({
  carouselId,
  count,
  gap = 12,
  dotColor = 'rgba(0, 0, 0, 0.2)',
  activeColor = 'rgb(0, 0, 0)',
  verticalOffset = '0px',
}: CarouselDotsProps) {
  const [active, setActive] = useState(0);

  const getStep = useCallback((carousel: HTMLElement) => {
    const slide = carousel.querySelector<HTMLElement>('.slide');
    return slide ? slide.clientWidth + gap : 300;
  }, [gap]);

  useEffect(() => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const onScroll = () => {
      const index = Math.round(carousel.scrollLeft / getStep(carousel));
      setActive(Math.max(0, Math.min(count - 1, index)));
    };

    carousel.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => carousel.removeEventListener('scroll', onScroll);
  }, [carouselId, count, getStep]);

  const goTo = (index: number) => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    carousel.scrollTo({ left: index * getStep(carousel), behavior: 'smooth' });
  };

  return (
    <div
      role="tablist"
      aria-label="Carousel pagination"
      style={{
        position: 'absolute',
        /* Sits inside the slider's 46px reserved bottom padding zone */
        bottom: `calc(8px + ${verticalOffset})`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'max-content',
        display: 'flex',
        alignItems: 'center',
        padding: '6px 0',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-label={`Go to slide ${i + 1}`}
          aria-selected={active === i}
          onClick={() => goTo(i)}
          style={{
            background: 'transparent',
            border: 'none',
            height: '30px', /* Explicit tap-area height; no padding/flex clash */
            padding: '0 9px', /* 6px dot + 9px each side = 24px slot — meets 24px touch target */
            margin: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: active === i ? activeColor : dotColor,
              transition: 'background 0.3s ease',
            }}
          />
        </button>
      ))}
    </div>
  );
}
