/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily:{
      'outfit':['outfit', 'sans-serif']
    },
    extend:{

      colors:{
        gray: colors.gray,
        red:colors.red,
        white:colors.white,
        blue:colors.blue,
        cyan:colors.cyan,
        sky: colors.sky,
        'gdblue': '#142149',
        'glblue': '#72788e',
        'signup_blue': '#257f9f',
        'black':'#2d333f',
        'name_blue':'#247F9E',
        'star_yellow':"#FDAF08"
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
