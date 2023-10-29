const plugin = require('tailwindcss/plugin')

export const gridAutoFit = plugin(function({ matchUtilities, theme }) {
   matchUtilities(
     {
       'grid-auto-fit': (value) => ({
         gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`
       }),
     },
     { values: theme('gridAutoFit') }
   )
 },
   {
     theme: {
      gridAutoFit: {
         'DEFAULT': '16rem',
         'mobile': '4rem',
         'xs': '12rem',
         'sm': '14rem',
         'md': '16rem',
         'lg': '18rem',
         'xl': '20rem',
       },
     },
   },
 )