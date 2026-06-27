/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Site has no dark theme; OS dark mode must not flip text colors on the white background
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['bg-[rgb(105,116,110)]', 'text-[rgb(105,116,110)]'],
  blocklist: ['style', 'script', 'iframe', 'object', 'embed'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ScheherazadeNew', 'Georgia', 'serif'],
        heading: ['ScheherazadeNew', 'Georgia', 'serif'],
        logo: ['DoulosSIL', 'Georgia', 'serif'],
      },
      spacing: {
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
  plugins: [],
};
