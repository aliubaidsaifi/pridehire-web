/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './animations/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0A0B', soft: '#26262A' },
        muted: '#6F6F76',
        line: '#EAEAEA',
        canvas: '#FFFFFF',
        paper: '#F6F6F6',
        brand: { violet: '#0A0A0B', indigo: '#26262A', glow: '#A1A1AA' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
      maxWidth: { container: '78rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(10,10,11,0.03), 0 10px 30px -14px rgba(10,10,11,0.08)',
        lift: '0 1px 2px rgba(10,10,11,0.04), 0 20px 44px -20px rgba(10,10,11,0.18)',
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem', '4xl': '2.25rem' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #0A0A0B 0%, #26262A 100%)',
        'soft-radial': 'radial-gradient(60% 60% at 50% 0%, rgba(10,10,11,0.035) 0%, rgba(10,10,11,0) 70%)',
      },
      keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 32s linear infinite' },
    },
  },
  plugins: [],
};