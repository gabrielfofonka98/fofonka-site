import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracota: {
          500: '#C84B3D',
          600: '#B53D30',
          bright: '#E36558',
        },
        papel: {
          50: '#FBF8F1',
          100: '#F8F2E8',
          200: '#F4ECDD',
          300: '#EDE3CF',
          suave: '#F0EAD8',
          muted: '#8A8478',
        },
        cerrado: {
          200: '#161B17',
          300: '#0E1310',
        },
        tinta: {
          DEFAULT: '#181818',
          muted: '#5C5650',
        },
        mata: {
          500: '#2D5A3D',
          bright: '#4F8A66',
        },
        marker: {
          400: '#E6B845',
          bright: '#F0C757',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Bricolage Grotesque"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Departure Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.5' }],
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.6875rem', { lineHeight: '1.3' }],
        '3xl': ['2.125rem', { lineHeight: '1.2' }],
        '4xl': ['2.625rem', { lineHeight: '1.15' }],
        '5xl': ['3.3125rem', { lineHeight: '1.05' }],
        '6xl': ['4.125rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.05em',
        wider: '0.1em',
      },
      maxWidth: {
        prose: '64ch',
        editorial: '40rem',
      },
    },
  },
  plugins: [],
};

export default config;
