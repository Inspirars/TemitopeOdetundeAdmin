/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./views/**/*.ejs',],
  theme: {
    extend: {
      colors : {
        black : {
          100 : "#827E7E",
          200 : "#231F20",
        },
        grey : {
          100 : "#E5E6E7",
          200 : "#667185"
        },
        purple : "#9546E8"
      },
      fontFamily : {
        inter : ["Inter", 'sans-serif'],
        satoshi : ['Satoshi', 'sans-serif']
      },
    },
  },
  plugins: [],
}

