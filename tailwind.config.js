/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4a2e', // Dark Green
          dark: '#123521',
        },
        accent: {
          DEFAULT: '#c9a84c', // Gold
          light: '#d4bb75',
        }
      }
    },
  },
  plugins: [],
}
