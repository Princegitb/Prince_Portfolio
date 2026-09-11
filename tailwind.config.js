/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F6F3EC',
          200: '#EFEAE0',
          300: '#E4DDD0',
          400: '#D5CBB9',
        },
        espresso: {
          700: '#2A2723',
          800: '#1F1D1A',
          850: '#171614',
          900: '#121110',
          950: '#0B0A09',
        },
        bronze: {
          200: '#EAD9BF',
          300: '#D8BE96',
          400: '#C5A472',
          500: '#B08C57',
          600: '#94723F',
          700: '#75572E',
        },
        taupe: {
          100: '#F0EBE1',
          200: '#E4DDCF',
          300: '#D2C8B5',
          400: '#B5A992',
        },
        telemetry: {
          cyan: '#47949B',
          teal: '#2F6E75',
          emerald: '#3F8A65',
          amber: '#C98F39',
          alert: '#B8453D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'archival': '0 10px 30px -5px rgba(26, 22, 18, 0.08), 0 0 0 1px rgba(176, 140, 87, 0.2)',
        'panel': '0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(197, 164, 114, 0.18)',
        'dossier': '0 8px 24px rgba(22, 20, 18, 0.06), inset 0 0 0 1px rgba(197, 164, 114, 0.25)',
      }
    },
  },
  plugins: [],
}
