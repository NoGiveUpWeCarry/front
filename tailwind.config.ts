import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',
        darkgray: '#7D7D7D',
        mediumgray: '#C7C7C7',
        lightgray: '#EAEAEA',
        softblue: '#7593F4',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        heading1: ['24px', '29px'],
        heading2: ['20px', '24px'],
        body1: ['14px', '17px'],
        caption1: ['12px', '14px'],
        caption2: ['10px', '12px'],
      },
      maxWidth: {
        'screen-center': '783px',
      },
      backgroundImage: {
        online: 'linear-gradient(to right, #039160, #96FFDA)',
        open: 'linear-gradient(to right, #9340FF, #FFDCDC)',
        project: 'linear-gradient(to right, #87DBFF, #FFA9BE)',
        offline: 'linear-gradient(to right, #FF383B, #FFBCBD)',
        close: 'linear-gradient(to right, #000000, #FFFFFF)',
        outsourcing: 'linear-gradient(to right, #FF8800, #84FF74)',
      },
    },
    plugins: [],
  },
} satisfies Config;
