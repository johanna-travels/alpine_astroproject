# Carousel Library

Reusable carousel components for Voyaflair. Import via the barrel:

```ts
import { Carousel, Card, CarouselDots } from "@/components/carousel";
```

## Files

- `apple-cards-carousel.tsx` — core `Carousel` (snap scroller) + `Card` (static media tile) + `LazyVideo` (plays only when visible) + `BlurImage`
- `apple-cards-carousel-demo.tsx` — the "Destinations" section used on the homepage (video cards)
- `CarouselDots.tsx` — shared pagination dots; also used by `PlayStoreCarousel.astro` (Articles)

## External dependencies — DO NOT REMOVE without checking here

1. **Design tokens** in `tailwind.config.js` (`theme.extend`):
   `h-card-mobile`, `h-card-desktop`, `w-card-mobile`, `w-card-desktop`,
   `pt-carousel-top-{sm,md,lg}`, `pb-dot-zone`.
   Card geometry and carousel spacing break silently if these are deleted.
2. **`.card-container` rules** in `src/styles/global.css` (bottom of file, intentionally
   *outside* `@layer` so they override utility font sizes on inner `<p>`).
3. **`CarouselDots` contract**: the scroll container needs a DOM `id`, and each slide
   needs the class `slide`. Step = slide width + `gap` prop (keep in sync with the
   actual flex gap, currently 12px on all screens).
4. **Videos** are served from `public/Video/` and prefixed with `import.meta.env.BASE_URL`
   (GitHub Pages base path `/alpine_astroproject/`). Plain `/Video/...` URLs 404 in production.

## Behaviour notes

- Mobile (<768px): snap-mandatory, one full-width card per view, dots navigation.
- Desktop (md+): free scroll (`md:snap-none`), fixed card size, dots navigation.
- Dark-mode variants are inert: `darkMode: 'class'` in `tailwind.config.js` and the site
  never sets `.dark`. They are a ready-made dark theme, not active styles.
