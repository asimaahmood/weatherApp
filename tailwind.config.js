const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
 
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      // opacity: ['disabled'],
    }
  }
}