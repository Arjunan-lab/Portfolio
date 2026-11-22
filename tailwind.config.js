/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact Reference Palette: Soft Off-White Base with Electric Cobalt Accent
        'canvas-light': '#F7F7F4',
        'canvas-card': '#FFFFFF',
        'canvas-dark': '#0C0D11',
        'canvas-dark-elevated': '#14161E',
        'text-black': '#111216',
        'text-dimmed': '#6B6E7B',
        'text-muted': '#8E929E',
        'border-light': '#E6E6DF',
        'border-dark': '#232632',
        
        // Exact Electric Cobalt Accent
        cobalt: {
          light: '#436BFF',
          DEFAULT: '#2B59FF',
          dark: '#1A43DE',
        },
        'acid-lime': '#7CE028',
        'coral-accent': '#FF5733',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
        ultra: '0.25em',
      },
      boxShadow: {
        'subtle-card': '0 4px 20px -2px rgba(17, 18, 22, 0.05)',
        'elevated': '0 20px 40px -15px rgba(17, 18, 22, 0.08)',
        'cobalt-glow': '0 0 35px rgba(43, 89, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
