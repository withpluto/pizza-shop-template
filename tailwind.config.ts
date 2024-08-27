import type { Config } from 'tailwindcss'

const colors = {
  'iris-purple': {
    100: '#F4F0FE',
    200: '#C2AEF9',
    300: '#A486F7',
    400: '#7747FF',
    500: '#3B0CBC',
    600: '#1F0B56',
  },
  'powder-purple': {
    100: '#F0F0FE',
    200: '#D9D9FD',
    300: '#8C8CF8',
    400: '#3F3FF3',
    500: '#0C0CC0',
    600: '#060660',
  },
  brick: {
    200: '#FF9CA5',
    300: '#EA6E83',
    700: '#B84467',
  },
  slate: {
    100: '#FCFCFD',
    200: '#E5DAFB',
    300: '#AE78F1',
    400: '#7114E2',
    500: '#4E00CC',
    600: '#26045D',
  },
  rice: {
    100: '#FFFEFA',
    200: '#F9F3DD',
    300: '#E0DCCA',
    400: '#D7B21D',
    500: '#8A7833',
    600: '#4A411C',
  },
  gray: {
    50: '#FBFBFB',
    100: '#F2F2F3',
    200: '#E3E2E4',
    300: '#D6D5D7',
    400: '#B9B7BD',
    500: '#87858E',
    600: '#706D78',
    700: '#4A4851',
    800: '#312F37',
    900: '#252329',
    950: '#1E1C22',
  },
  blue: {
    100: '#F0F5FF',
    200: '#D9E5FC',
    300: '#8EB1F6',
    400: '#6898F4',
    500: '#0C45B0',
    600: '#06235B',
  },
  green: {
    100: '#F3FCF8',
    200: '#DCF9ED',
    300: '#89F5CB',
    400: '#0FB872',
    500: '#215942',
    600: '#194331',
  },
  yellow: {
    100: '#FEF8F0',
    200: '#FCE4C5',
    300: '#FFC170',
    400: '#F5AB47',
    500: '#744A11',
    600: '#4A411C',
  },
  red: {
    100: '#FFF5F7',
    200: '#FADBE0',
    300: '#EA6E83',
    400: '#D61F56',
    500: '#8A334D',
    600: '#592132',
  },
} as const

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors,
      borderWidth: {
        1: '1px',
      },
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/typography')],
} as Config
