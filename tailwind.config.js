/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e4d2cc',
          300: '#ceb2a7',
          400: '#b48a7b',
          500: '#9a6b5a',
          600: '#845343',
          700: '#6d4235',
          800: '#5a382d',
          900: '#4c3027',
          950: '#281712',
        },
        brand: {
          gold: '#dfa732',
          orange: '#ff6600',
          dark: '#080706',
          woodDark: '#1c1512',
          copper: '#b87333',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'wood-texture': "linear-gradient(rgba(8, 7, 6, 0.88), rgba(8, 7, 6, 0.94)), url('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80&w=2000')",
        'radial-glow': 'radial-gradient(circle at center, var(--glow-color, rgba(223, 167, 50, 0.15)) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #080706 0%, #1c1512 50%, #080706 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(223, 167, 50, 0.2), 0 0 40px rgba(223, 167, 50, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(223, 167, 50, 0.5), 0 0 80px rgba(223, 167, 50, 0.2)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(223, 167, 50, 0.3)' },
          '50%': { borderColor: 'rgba(223, 167, 50, 0.8)' },
        },
      },
      backdropBlur: {
        '4xl': '72px',
      },
      dropShadow: {
        'gold': '0 4px 24px rgba(223, 167, 50, 0.5)',
        'gold-lg': '0 8px 48px rgba(223, 167, 50, 0.4)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(223, 167, 50, 0.3), 0 20px 60px rgba(0,0,0,0.5)',
        'gold-glow': '0 0 60px rgba(223, 167, 50, 0.4), 0 0 120px rgba(223, 167, 50, 0.15)',
        'card-hover': '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(223, 167, 50, 0.15)',
        'inner-glow': 'inset 0 0 30px rgba(223, 167, 50, 0.1)',
      }
    },
  },
  plugins: [],
}
