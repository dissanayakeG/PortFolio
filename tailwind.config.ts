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
        // primary: '#1DA1F2', //bg-primary
        theme: {
          DEFAULT: '#dce0e2', // bg-primary
          light: '#727c83',   // bg-primary-light
          dark: '#304653',    // bg-primary-dark
        },
        primary: {
          DEFAULT: '#1DA1F2', // bg-primary
          light: '#3683b3',   // bg-primary-light
          dark: '#1e6b9b',    // bg-primary-dark
        },
        secondary: {
          DEFAULT: '#c1d31c', // bg-secondary
          light: '#bbc752',   // bg-secondary-light
          dark: '#cbe00d',    // bg-secondary-dark
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
