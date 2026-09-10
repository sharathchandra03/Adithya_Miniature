import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14110E',
          soft: '#221D17',
          muted: '#3A332B',
        },
        paper: {
          DEFAULT: '#F4EFE6',
          soft: '#EBE4D6',
          dim: '#DED5C4',
        },
        brass: {
          DEFAULT: '#C8962C',
          light: '#E7BE6A',
          dark: '#9A6F1B',
        },
        steel: {
          DEFAULT: '#6B675F',
          light: '#8E897F',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        label: '0.28em',
      },
      maxWidth: {
        container: '1320px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      spacing: {
        section: 'clamp(6rem, 12vw, 12rem)',
      },
      boxShadow: {
        plate: '0 30px 60px -25px rgba(20, 17, 14, 0.45), inset 0 1px 1px rgba(255,255,255,0.08)',
        soft: '0 20px 50px -30px rgba(20, 17, 14, 0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
