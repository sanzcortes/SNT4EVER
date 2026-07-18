/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: '850px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#FFEE00',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.6)',
          foreground: 'rgba(255, 255, 255, 0.4)',
        },
        accent: {
          DEFAULT: '#FFEE00',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'hsl(var(--input))',
        ring: '#FFEE00',
        // Custom colors for SNT
        yellow: '#FFEE00',
        'yellow-foreground': '#000000',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.4rem', { lineHeight: '2rem' }], // Original body copy
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'marquee': 'marquee 20s linear infinite',
        'year-glow': 'yearGlow 2s ease-in-out infinite',
        'nav-indicator': 'navIndicator 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'year-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(255, 238, 0, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 238, 0, 0.8)',
            transform: 'scale(1.05)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(255, 238, 0, 0.3)',
            transform: 'scale(1)'
          }
        },
        'nav-indicator': {
          '0%': { 
            width: '0%',
            opacity: 0
          },
          '100%': { 
            width: '100%',
            opacity: 1
          }
        },
      },
      boxShadow: {
        'text': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(255, 238, 0, 0.3)',
      },
    },
  },
  plugins: [],
}