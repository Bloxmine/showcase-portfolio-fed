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
        'section-text': '#f5f5f5',
        'section-bg': '#181818',
        'secondary-bg': '#232323',
        'accent': '#ffffff',
        'text': '#f5f5f5',
        'muted': '#ebebeb',
        'light-black': '#1a1a1a',
        'dark-black': '#121212',
        'white-background': '#f6f6f6',
        'cyan': '#09fdfd',
        'magenta': '#fc0101',
        'yellow': '#E3AA00',
        'key': '#0A0A0A',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'Arial', 'sans-serif'],
        'inter': ['Inter', 'Arial', 'sans-serif'],
        'flying-text': ['Intranet', 'Arial', 'sans-serif'],
        'h2': ['MisterFirley', 'Arial', 'sans-serif'],
        'p': ['Oswald', 'Arial', 'sans-serif'],
      },
      animation: {
        'fly-diagonal': 'flyDiagonal 20s linear infinite',
      },
      keyframes: {
        flyDiagonal: {
          '0%': { transform: 'translate(-100%, -100%)' },
          '100%': { transform: 'translate(100vw, 100vh)' },
        },
      },
    },
  },
  plugins: [],
}
