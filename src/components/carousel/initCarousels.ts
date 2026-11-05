// Swipe, mouse drag and dots for every carousel on the page.
// Contract: a [data-carousel-dots] root whose data-carousel-id names the scroll
// container, and [data-slide] on each slide.
function bindCarousel(carousel: HTMLElement, dotsRoot: HTMLElement) {
  const gap = Number(dotsRoot.getAttribute('data-carousel-gap') ?? 12);
  const slides = carousel.querySelectorAll<HTMLElement>('[data-slide]');
  const dots = dotsRoot.querySelectorAll('[data-carousel-dot]');

  let rafId = 0;
  let isPointerDown = false;
  let didDrag = false;
  let isMouseDrag = false;
  let startX = 0;
  let startScrollLeft = 0;

  const getStep = () => {
    const slide = slides[0];
    return slide ? slide.clientWidth + gap : 300;
  };

  const setDotActive = (index: number) => {
    dots.forEach((dot) => {
      const i = Number(dot.getAttribute('data-carousel-dot'));
      const indicator = dot.querySelector('[data-carousel-dot-indicator]');
      const active = i === index;
      dot.setAttribute('aria-selected', String(active));
      indicator?.classList.toggle('bg-black', active);
      indicator?.classList.toggle('bg-black/20', !active);
    });
  };

  const updateActiveSlide = () => {
    if (!slides.length) return;

    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carouselRect.width / 2;

    let closest = slides[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = slide;
      }
    });

    slides.forEach((slide) => slide.classList.toggle('is-active', slide === closest));

    const index = Array.from(slides).indexOf(closest);
    if (index >= 0) setDotActive(index);
  };

  const onScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateActiveSlide);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.getAttribute('data-carousel-dot'));
      carousel.scrollTo({ left: index * getStep(), behavior: 'smooth' });
    });
  });

  carousel.addEventListener('scroll', onScroll, { passive: true });

  const onPointerMove = (event: PointerEvent) => {
    if (!isPointerDown) return;

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 4) {
      didDrag = true;
      if (isMouseDrag) {
        carousel.classList.add('is-dragging');
        carousel.scrollLeft = startScrollLeft - deltaX;
      }
    }
  };

  const onPointerUp = () => {
    isPointerDown = false;
    isMouseDrag = false;
    carousel.classList.remove('is-dragging');
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
  };

  carousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isPointerDown = true;
    didDrag = false;
    isMouseDrag = event.pointerType === 'mouse';
    startX = event.clientX;
    startScrollLeft = carousel.scrollLeft;

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  });

  carousel.addEventListener('click', (event) => {
    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  carousel.addEventListener('dragstart', (event) => event.preventDefault());

  updateActiveSlide();
}

export function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel-dots]').forEach((dotsRoot) => {
    const carousel = document.getElementById(dotsRoot.getAttribute('data-carousel-id') ?? '');
    if (!carousel || carousel.dataset.bound === 'true') return;
    carousel.dataset.bound = 'true';
    bindCarousel(carousel, dotsRoot);
  });
}
