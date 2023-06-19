/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
