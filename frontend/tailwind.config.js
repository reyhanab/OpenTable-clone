/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend:{

      colors:{
        gray: colors.gray,
        red:colors.red,
        white:colors.white,
        blue:colors.blue,
        cyan:colors.cyan,
        sky: colors.sky,
        'gdblue': '#142149',
        'glblue': "#72788e"
      }
    }
  },
  plugins: [],
}
