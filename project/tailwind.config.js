/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008F39', // Verde puro
          dark: '#006D2C', // Verde oscuro
          light: '#00B348', // Verde claro
        },
        dark: {
          DEFAULT: '#000000', // Negro puro
          light: '#111111', // Negro ligeramente más claro para contraste
        },
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};