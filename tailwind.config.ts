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
          DEFAULT: '#047df6', // bg-primary
          light: '#3794f0',   // bg-primary-light
          dark: '#386695',    // bg-primary-dark
        },
        secondary: {
          DEFAULT: '#FFC300', // bg-secondary
          light: '#f1e736',   // bg-secondary-light
          dark: '#ada51e',    // bg-secondary-dark
        },
        white: '#ffffff'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
