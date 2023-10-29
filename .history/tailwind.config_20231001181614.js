/** @type {import('tailwindcss').Config} */
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

      },
      minWidth:{
        'mobile': '360px',
        '54': '258px',
      },
      screens:{
        'xs': '580px',
        '850': '850px',
      },
    },
  },
  plugins: [],
}
