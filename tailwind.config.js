/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f7f8f5',
          100: '#eef0e8',
          200: '#dde2d1',
          300: '#c4ccb2',
          400: '#a8b48f',
          500: '#8d9b70',
          600: '#6f7d57',
          700: '#596347',
          800: '#4a513c',
          900: '#3f4434',
        },
        cream: {
          50: '#fdfdfb',
          100: '#fbfaf7',
          200: '#f8f5ee',
          300: '#f2ede1',
          400: '#e8dfc9',
        }
      },
    },
  },
  plugins: [],
}