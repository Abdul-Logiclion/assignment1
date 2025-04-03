/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
 
  plugins: [
    'tailwindcss',
    'autoprefixer',
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

