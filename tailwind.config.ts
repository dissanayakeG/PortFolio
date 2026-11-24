import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx,md}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        // Core surfaces — deep navy with distinct raised states.
        theme: {
          DEFAULT: '#10263A', // borders and restrained surface accents
          light: '#183851',   // elevated cards and hover surfaces
          dark: '#071625',    // primary page background
        },
        // Cyan is the primary interactive color; gold is reserved for emphasis.
        primary: {
          DEFAULT: '#6EE7DE', // primary interactive state
          light: '#A4F4EE',   // hover / high-emphasis state
          dark: '#35B9B0',    // pressed / dark contrast state
        },
        secondary: {
          DEFAULT: '#FFC857', // warm editorial accent
          light: '#FFDA85',   // lighter accent text
          dark: '#D69B16',    // stronger accent contrast
        },
        white: '#F4F9FC',
      },
    },
  },
};
export default config;
