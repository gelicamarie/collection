/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 11s linear infinite',
        marquee2: 'marquee2 11s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      fontFamily: {
        base: 'Inter, sans-serif',
        title: 'Roboto Mono, monospace',
      },
      fontSize: {
        xxs: ['11px', { lineHeight: '14px' }],
      },
      colors: {
        green: {
          800: '#1E231A',
        },
        base: {
          600: '#303030',
          700: '#202020',
          800: '#1E1E1E',
        },
        black: '#02020',
      },
    },
  },
  plugins: [],
}
