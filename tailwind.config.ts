// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional Mesia Color Palette
        mesia: {
          wine: '#753647',           // Deep wine/burgundy for titles
          gold: '#E2C874',           // Golden yellow for accents
          cream: '#FAF7F0',          // Light cream background
          lightCream: '#F9F6F1',     // Secondary background
          beige: '#F0EDE5',          // Card backgrounds
          darkText: '#2D2D2D',       // Dark charcoal text
          lightText: '#6B5B73',      // Muted text
          accent: '#D4B942',         // Darker gold for hover states
        },
        // Keep your existing primary colors as fallback
        primary: {
          50: '#fdf4f3',
          100: '#fce7e6',
          200: '#f9d4d2',
          300: '#f4b5b1',
          400: '#ec8983',
          500: '#E2C874',
          600: '#d4481c',
          700: '#b23a15',
          800: '#933315',
          900: '#7a2f18',
        },
        secondary: {
          50: '#f8f6f4',
          100: '#f0ebe6',
          200: '#e0d5cc',
          300: '#cbb8a8',
          400: '#b59684',
          500: '#753647',
          600: '#8f6355',
          700: '#775148',
          800: '#62433e',
          900: '#513735',
        },
        accent: {
          50: '#fefdf8',
          100: '#fdfbf0',
          200: '#faf5de',
          300: '#f6edc4',
          400: '#f1e0a0',
          500: '#E2C874',
          600: '#d4b942',
          700: '#b89635',
          800: '#95762e',
          900: '#7a6029',
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        greek: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { 'box-shadow': '0 0 20px #E2C874' },
          to: { 'box-shadow': '0 0 30px #753647' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, #E2C874, transparent 50%), radial-gradient(at 80% 0%, #753647, transparent 50%), radial-gradient(at 0% 50%, #FAF7F0, transparent 50%)',
      },
    },
  },
  plugins: [],
}
