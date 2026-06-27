# Agent: page spacing (homepage standard)

**Rule:** one owner per axis. No duplicate `px` / `pl` / `margin` on the same row.

| Axis | Owner |
|------|--------|
| Left/right inset | `.section-gutter` (`global.css`) |
| Title row vertical | `.section-header` (`global.css`) |
| Gap between major sections | parent `flex flex-col gap-*` only |

Breakpoints: `md` 768 · `lg` 1024 · `xl` 1280

---

## Values (px)

| | Mobile | md | lg | xl |
|--|--------|-----|-----|-----|
| `.section-gutter` | 10 | 24 | 64 | 80 |
| `.section-header` top | 24 | 24 | 48 | 48 |
| `.section-header` bottom | 24 | 24 | 32 | 32 |
| Page `pt` | 32 | 40 | 48 | 64 |
| Page `gap` | 32 | 32 | 48 | 64 |
| Page `pb` | 64 | 64 | 96 | 96 |
| Contact grid `py` (md+) | — | 32 | 64 | 64 |

---

## Desktop (`lg` / `xl`) — copy this

**Page stack** (inside `<main>`):

```html
<div class="flex flex-col gap-8 pb-16 pt-8 md:gap-8 md:pb-16 md:pt-10 lg:gap-12 lg:pb-24 lg:pt-12 xl:gap-16 xl:pt-16">
```

**Section block:**

```html
<SectionHeader title="…" href="…" />
<div class="section-gutter">
  <!-- content -->
</div>
```

**Gutters at `lg`:** 64px sides · **`xl`:** 80px sides (CSS only — do not add `lg:px-*` on wrapper).

**Contact in page stack:** `<ContactSectionWithShader stacked />` — grid `md:py-8 lg:py-16` (32/64px), sides `md:px-6 lg:px-16 xl:px-20`; mobile stacked `pt-0` (page gap owns top).

**Hero (desktop block):** inner text `lg:pl-16 lg:pr-16 xl:pl-20 xl:pr-20` — hero card stays `mx-[10px]`.

---

## Components (use, don’t reinvent)

| Need | File |
|------|------|
| Title + VIEW ALL | `SectionHeader.astro` |
| CTA in header | `CtaLink.astro` — header passes `class="px-0 md:px-[32px]"` |
| Contact in homepage flow | `contact-section-with-shader.tsx` + `stacked` |

Reference implementation: `src/pages/index.astro`

---

## DO NOT (conflicts)

- Add `px-*` / `pl-*` on parent **and** `.section-gutter` on child
- Put `py-16` / `pb-16` on section wrapper **and** page `gap-*`
- Use `CtaLink` in header without `px-0` on mobile
- Set `md:px-56` or `lg:pl-[176px]` on wrappers (gutters live in CSS)
- Contact in stack without `stacked` (doubles top gap with `py-10`)
- `overflow-hidden` on same wrapper as `SectionHeader` (clips title row)

---

## New stacked page (minimal)

```astro
<main>
  <div class="flex flex-col gap-8 pb-16 pt-8 md:gap-8 md:pb-16 md:pt-10 lg:gap-12 lg:pb-24 lg:pt-12 xl:gap-16 xl:pt-16">
    <section>
      <SectionHeader title="…" href="…" />
      <div class="section-gutter">…</div>
    </section>
    <ContactSectionWithShader client:idle stacked />
  </div>
</main>
```

CSS source: `src/styles/global.css` (`.section-gutter`, `.section-header`).
