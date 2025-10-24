/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fff',
        'section-bg': '#181818',
        'secondary-bg': '#232323',
        'accent': '#00bcd4',
        'text-light': '#f5f5f5',
        'muted': '#b0b0b0',
        'light-black': '#1a1a1a',
        'dark-black': '#121212',
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
