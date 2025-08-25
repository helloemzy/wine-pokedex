/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pokedex-red': '#dc2626',
        'pokedex-blue': '#1d4ed8',
        'pokedex-yellow': '#facc15',
        'pokedex-green': '#16a34a',
        'pokedex-light-blue': '#38bdf8',
        'pokedex-dark-blue': '#1e40af',
        'wine-deep-red': '#722f37',
        'wine-burgundy': '#800020',
        'wine-gold': '#ffd700',
        'wine-rose': '#f4c2c2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pokeball-spin': 'pokeball-spin 2s linear infinite',
        'card-flip': 'card-flip 0.6s ease-in-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        'pokeball-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' }
        },
        'shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' }
        }
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      writingMode: {
        'vertical-rl': 'vertical-rl',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          '--tw-rotate-y': '180deg',
          transform: 'rotateY(var(--tw-rotate-y))',
        },
        '.writing-vertical-rl': {
          'writing-mode': 'vertical-rl',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}