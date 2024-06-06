/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    
  ],
  theme: {
    fontFamily : {
      'sans': ["Noto Serif", "serif"]
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        // lg: '8rem',
        xl: '8rem',
        // '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}