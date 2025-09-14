/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens mapped to CSS variables (set in global CSS)
        bg: 'hsl(var(--color-bg) / <alpha-value>)',
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        overlay: 'hsl(var(--color-overlay) / <alpha-value>)',
        border: 'hsl(var(--color-border) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        content: 'hsl(var(--color-content) / <alpha-value>)',
        contentMuted: 'hsl(var(--color-content-muted) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          fg: 'hsl(var(--color-primary-fg) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          fg: 'hsl(var(--color-secondary-fg) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          fg: 'hsl(var(--color-accent-fg) / <alpha-value>)'
        },
        danger: {
          DEFAULT: 'hsl(var(--color-danger) / <alpha-value>)',
          fg: 'hsl(var(--color-danger-fg) / <alpha-value>)'
        },
        warn: {
          DEFAULT: 'hsl(var(--color-warn) / <alpha-value>)',
          fg: 'hsl(var(--color-warn-fg) / <alpha-value>)'
        },
        success: {
          DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
          fg: 'hsl(var(--color-success-fg) / <alpha-value>)'
        },
        info: {
          DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
          fg: 'hsl(var(--color-info-fg) / <alpha-value>)'
        },
        // Gradient reference colors
        aurora: {
          1: 'hsl(var(--color-aurora-1) / <alpha-value>)',
          2: 'hsl(var(--color-aurora-2) / <alpha-value>)',
          3: 'hsl(var(--color-aurora-3) / <alpha-value>)',
          4: 'hsl(var(--color-aurora-4) / <alpha-value>)'
        }
      },
      backgroundImage: {
        'gradient-radial-soft': 'radial-gradient(circle at 30% 30%, hsl(var(--color-aurora-2) / 0.25), transparent 60%)',
        'gradient-radial-strong': 'radial-gradient(circle at 70% 70%, hsl(var(--color-aurora-3) / 0.4), transparent 65%)',
        'gradient-aurora': 'linear-gradient(115deg, hsl(var(--color-aurora-1) / 0.85), hsl(var(--color-aurora-2) / 0.75) 30%, hsl(var(--color-aurora-3) / 0.8) 60%, hsl(var(--color-aurora-4) / 0.85))'
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'pulse-soft': {
          '0%,100%': { opacity: '.6' },
          '50%': { opacity: '1' }
        },
        'float-y': {
          '0%,100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(3px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' }
        },
        'reveal': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(.98)' },
          '60%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'aurora-shift': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(25deg)' }
        },
        'rocket-float': {
          '0%,100%': { transform: 'translateY(-6px) rotate(-1deg)' },
          '50%': { transform: 'translateY(6px) rotate(1deg)' }
        },
        'rocket-launch': {
          '0%': { transform: 'translateY(120px) scale(.9)', opacity: '0' },
          '10%': { opacity: '1' },
          '40%': { transform: 'translateY(-10px) scale(1)', opacity: '1' },
          '55%': { transform: 'translateY(8px) scale(1.01)' },
          '70%': { transform: 'translateY(-4px) scale(1)' },
          '85%': { transform: 'translateY(3px) scale(1)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        'trail-flicker': {
          '0%,100%': { opacity: '.75' },
          '50%': { opacity: '.3' }
        },
        'exhaust': {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '1' },
          '80%': { opacity: '0.5' },
          '100%': { transform: 'translateY(40px) scaleY(1.6)', opacity: '0' }
        },
        'twinkle': {
          '0%,100%': { opacity: '0.2', transform: 'scale(.9)' },
          '50%': { opacity: '0.9', transform: 'scale(1.1)' }
        },
        'starfield-shift': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(600px)' }
        }
        , 'dash-item': {
          '0%': { opacity: '0', transform: 'translateY(18px) scale(.97) rotateX(15deg)', filter: 'blur(4px)' },
          '55%': { opacity: '1', transform: 'translateY(-2px) scale(1) rotateX(0deg)', filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0deg)', filter: 'blur(0)' }
        }
        , 'symbol-flip': {
          '0%': { opacity: '0', transform: 'scale(.6) rotateX(55deg)', filter: 'blur(4px)' },
          '55%': { opacity: '1', transform: 'scale(1.04) rotateX(0deg)', filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'scale(1) rotateX(0deg)', filter: 'blur(0)' }
        }
        
      },
      animation: {
        'fade-in': 'fade-in .5s var(--ease-out) both',
        'slide-up': 'slide-up .55s var(--ease-out) both',
        'scale-in': 'scale-in .4s var(--ease-out) both',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'float-y': 'float-y 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        reveal: 'reveal .8s var(--ease-out) both',
        'aurora-shift': 'aurora-shift 14s linear infinite alternate'
        , 'rocket-float': 'rocket-float 8s ease-in-out infinite'
  , 'rocket-launch': 'rocket-launch 2.4s cubic-bezier(.22,.9,.3,1) both'
  , 'trail-flicker': 'trail-flicker 1.2s ease-in-out infinite'
        , 'exhaust': 'exhaust 1.8s ease-out infinite'
        , 'twinkle': 'twinkle 3.2s ease-in-out infinite'
        , 'starfield-shift': 'starfield-shift 35s linear infinite'
        , 'dash-item': 'dash-item .85s cubic-bezier(.22,.9,.3,1) both'
        , 'symbol-flip': 'symbol-flip .5s var(--ease-out) both'
        
      },
      transitionTimingFunction: {
        'in': 'cubic-bezier(.5, 0, .7, .4)',
        'out': 'cubic-bezier(.2, .8, .2, 1)',
        'snappy': 'cubic-bezier(.36,1,.3,1)',
        'emphasized': 'cubic-bezier(.2,.8,.2,1)'
      },
      boxShadow: {
        'soft': '0 1px 2px -1px hsl(var(--color-shadow) / 0.3), 0 3px 6px -1px hsl(var(--color-shadow) / 0.2)',
        'elevated': '0 2px 4px -1px hsl(var(--color-shadow) / 0.35), 0 8px 18px -6px hsl(var(--color-shadow) / 0.3)',
        'glow': '0 0 0 1px hsl(var(--color-primary) / 0.4), 0 0 0 4px hsl(var(--color-primary) / 0.15)'
      },
      screens: {
        'xs': '420px'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    function({ addUtilities }) {
      addUtilities({
        '.motion-reduce\:transition-none': {
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none !important',
            animation: 'none !important'
          }
        },
        '.tap-highlight-none': {
          WebkitTapHighlightColor: 'transparent'
        },
        '.preserve-3d': { transformStyle: 'preserve-3d' },
        '.perspective-1000': { perspective: '1000px' }
      });
    }
  ]
};
