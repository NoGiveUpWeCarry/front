import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#F5F5F5',
        darkgray: '#7D7D7D',
        mediumgray: '#C7C7C7',
        lightgray: '#EAEAEA',
        softblue: '#7593F4',
      },
      backgroundImage: {
        online: 'linear-gradient(to right, #039160, #96FFDA)', // 선형-그라데이션 버튼색상
        open: 'linear-gradient(to right, #9340FF, #FFDCDC)',
        project: 'linear-gradient(to right, #87DBFF, #FFA9BE)',
        offline: 'linear-gradient(to right, #FF383B, #FFBCBD)',
        close: 'linear-gradient(to right, #000000, #FFFFFF)',
        outsourcing: 'linear-gradient(to right, #FF8800, #84FF74)',
      },
      fontSize: {
        heading1: ['24px', '29px'], // font-size 24px, line-height 32px
        heading2: ['20px', '24px'],
        body1: ['14px', '17px'],
        caption1: ['12px', '14px'],
        caption2: ['10px', '12px'],
      },
    },
  },
  plugins: [],
} satisfies Config;
