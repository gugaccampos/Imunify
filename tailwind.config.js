/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
          fontFamily: {
              'sans': ['Inter'],
          },
          fontSize: {
              '32': '2rem',
          },
          colors: {
              'azul': {
                  300: '#26F2F1',
                  400: '#5EE0F1',
                  DEFAULT: '#5EE0F1',
                  800: '#1C274C',
              },
              'roxo': '#D05BFA',
              'vermelho':{
                  500: '#E51110',
                  DEFAULT: '#E51110',
                  700: '#B00F0F',
              },
              'preto': '#181818',
              'branco': '#FBFBFB',
              'cinza': '#797979',
              'cinza-claro': '#F2F2F2',
              
          },
          dropShadow: {
              'modal': '0 2px 1px rgba(0, 0, 0, 0.8)'
          },
          /*backgroundImage: {
          },*/
      },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
};

