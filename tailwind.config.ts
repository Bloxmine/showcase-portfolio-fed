import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        intranet: ['Intranet', 'Arial', 'sans-serif'],
        firley: ['MisterFirley', 'Arial', 'sans-serif'],
        oswald: ['Oswald', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#fff',
        'section-text': '#f5f5f5',
        'section-bg': '#181818',
        'secondary-bg': '#232323',
        'light-black': '#1a1a1a',
        'dark-black': '#121212',
        'white-background': '#f6f6f6',
        'custom-cyan': '#09fdfd',
        'custom-magenta': '#eb01fc',
        'custom-yellow': '#E3AA00',
      },
    },
  },
  plugins: [],
};
export default config;
