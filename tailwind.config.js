/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    container:{
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      xs: "414px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        singerOverlay: 'url(/assets/hero/singer-overlay.png)',
        newsletter: 'url(/assets/newsletter/bg2.png)',
        events: 'url(/assets/events/bgEvents.png)',
      },
      fontFamily: {
        alexBrush: [`var(--font-alexBrush)`, 'sans-serif'],
        montserrat: [`var(--font-montserrat)`, 'sans-serif'],
        michroma: [`var(--font-michroma)`, 'sans-serif'],

      },
      colors:{
        // primary: '#06062a',
        primary: '#000000',
        // secondary: '#151538',
        secondary: '#1e1e1e',
        // tertiary: '#242445',
        tertiary: '#3b3b3b',
        accent: {
          //DEFAULT: '#7f1cfc',
          // DEFAULT: '#0601fe',
          DEFAULT: '#339CE6',
          hover: '#310d2d',
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
};
