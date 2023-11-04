/** @type {import('tailwindcss').Config} */

const { capitalizeFirst } = require('./src/app/utilities/tailwind/capitalizeFirst');
const { gridAutoFit } = require('./src/app/utilities/tailwind/gridAutoFit')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height:{
        'screen-1/2': '50vh',
        'screen-1/4': '25vh',
        'screen-3/4': '75vh',
        'screen-2/3': '66vh',
        'screen-1/3': '33vh',
        '112': '28rem',
        '128': '32rem',
      },
      minHeight:{
        'screen-1/2': '50vh',
        'screen-1/4': '25vh',
        'screen-3/4': '75vh',
        'screen-2/3': '66vh',
        'screen-1/3': '33vh',
        '112': '28rem',
        '128': '32rem',
      },
      maxHeight:{
        'screen-1/2': '50vh',
        'screen-1/4': '25vh',
        'screen-3/4': '75vh',
        'screen-2/3': '66vh',
        'screen-1/3': '33vh',
        '112': '28rem',
        '128': '32rem',
      },
      width:{
        '112': '28rem',
        '128': '32rem',
      },
      colors:{
        "emerald":{
          "50": "#b0fde8",
          "100": "#60FBD2",
          "200": "#24F9C1",
          "400": "#06EFB1",
          "500": "#06d6a0",
        },
        "paygray":{
          "50": "#CED9DE",
          "100": "#aabcc5",
          "200": "#7996A4",
          "400": "#638292",
          "500": "#5A7684",
        },
        "vermilion":{
          "50": "#f0afa8",
          "100": "#ea8f85",
          "200": "#E06052",
          "400": "#dc493a",
          "500": "#d03625",
        },
        'violet': {
          '50': '#f5f3ff',
          '100': '#ede9fe',
          '200': '#ddd6fe',
          '300': '#c4b5fd',
          '400': '#a78bfa',
          '500': '#8b5cf6',
          '600': '#7c3aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
          '950': '#2e1065',
      },
      },
      minWidth:{
        'mobile': '360px',
        '54': '258px',
      },
      screens:{
        'mobile': '360px',
        '2xs': '440px',
        'xs': '580px',
        '850': '850px',
      },
    },
  }, 
  plugins: [capitalizeFirst, gridAutoFit],
}
