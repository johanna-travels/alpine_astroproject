/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Site has no dark theme; OS dark mode must not flip text colors on the white background
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [],
  blocklist: ['style', 'script', 'iframe', 'object', 'embed'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      height: {
        'card-mobile': '600px', // Carousel card height on mobile
        'card-desktop': '40rem', // Carousel card height on md+
      },
      width: {
        'card-mobile': 'calc(100vw - 2rem)', // Full-width mobile card inside 1rem gutters
        'card-desktop': '24rem', // md:w-96 equivalent
      },
      spacing: {
        'carousel-top-sm': '24px', // Carousel breathing padding-top, mobile
        'carousel-top-md': '40px', // Carousel breathing padding-top, tablet
        'carousel-top-lg': '56px', // Carousel breathing padding-top, desktop
        'dot-zone': '70px', // Bottom zone reserved for pagination dots
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1.2s ease-out forwards',
      },
    },
  },
  plugins: [
    require('lightswind/plugin'),],
};
