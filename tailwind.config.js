module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#273043'
    }),
    fontFamily: {
      'title': ['Permanent Marker', 'cursive']
    }
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
