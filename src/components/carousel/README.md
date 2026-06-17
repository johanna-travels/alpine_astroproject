# Carousel Library

Reusable carousel components for Voyaflair. Import via the barrel:

```ts
import { CarouselDots } from "@/components/carousel";
```

## Files

- `CarouselDots.tsx` — shared pagination dots; used by `PlayStoreCarousel.astro` (Articles)

## External dependencies — DO NOT REMOVE without checking here

1. **`CarouselDots` contract**: the scroll container needs a DOM `id`, and each slide
   needs the class `slide`. Step = slide width + `gap` prop (keep in sync with the
   actual flex gap, currently 12px on all screens).
