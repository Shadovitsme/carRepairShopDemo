import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          white: '#FFFFFF',
          black: '#2A2A2A',
          textBlueDark: '#222959',
          textBlue: '#7A7E9F',
          alert: '#F17E80',
        },
        blue: {
          100: '#F0F4FA',
          200: '#90C8FF',
          300: '#4AA5FF',
          400: '#2291FF',
          500: '#0982FA',
          600: '#057AEE',
          700: '#066ED4',
          800: '#0D66BF',
          900: '#033F7B',
        },
        gray: {
          100: '#FCFCFC',
          200: '#E1E3E7',
          300: '#E1E3E7',
          400: '#91949A',
          500: '#76787A',
          600: '#5D5F60',
          700: '#444648',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
        green: {
          100: '#DEF7EC',
          200: '#BFF0BC',
          300: '#84E184',
          400: '#67DC70',
          500: '#47C751',
          600: '#03AA35',
          700: '#046C4E',
          800: '#03543F',
          900: '#014737',
        },
        pink: {
          100: '#FCE8F3',
          200: '#FAD1E8',
          300: '#F8B4D9',
          400: '#F17EB8',
          500: '#E74694',
          600: '#D61F69',
          700: '#BF125D',
          800: '#99154B',
          900: '#751A3D',
        },
        indigo: {
          100: '#E5EDFF',
          200: '#CDDBFE',
          300: '#B4C6FC',
          400: '#8DA2FB',
          500: '#6875F5',
          600: '#5850EC',
          700: '#5145CD',
          800: '#42389D',
          900: '#362F78',
        },
      },
      screens: {
        tablet: '40rem',
        // => @media (min-width: 640px) { ... }

        laptop: '64rem',
        // => @media (min-width: 1024px) { ... }

        desktop: '100rem',
        // => @media (min-width: 1600px) { ... }
        tv: '120rem',
        // => @media (min-width: 1920px) { ... }
      },
      padding: {
        4.5: '18px',
        29.25: '117px',
      },
      width: {
        83.5: '334px',
      },
      borderRadius: {
        '2.5xl': '20px',
      },
    },
  },

  plugins: [forms],
}
