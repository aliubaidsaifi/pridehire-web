/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './animations/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0E12',
          soft: '#1A1A22',
        },
        muted: '#6B6B76',
        line: '#ECECF1',
        canvas: '#FBFBFD',
        brand: {
          indigo: '#4F46E5',
          violet: '#7C3AED',
          glow: '#A78BFA',
        },
      },
      fontFamily: {
        // Wired up via next/font in app/layout.js
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        container: '78rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14,14,18,0.04), 0 12px 32px -12px rgba(14,14,18,0.12)',
        lift: '0 1px 2px rgba(14,14,18,0.05), 0 28px 60px -20px rgba(79,70,229,0.28)',
        ring: '0 0 0 1px rgba(14,14,18,0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #4F46E5 0%, #7C3AED 100%)',
        'soft-radial':
          'radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0) 70%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
