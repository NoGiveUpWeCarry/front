import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#1E3A8A', // h1 텍스트 색상
              fontSize: '2.25rem', // h1 폰트 크기
              fontWeight: 'bold', // h1 폰트 굵기
            },
            p: {
              color: '#4B5563', // p 텍스트 색상
              fontSize: '1rem', // p 폰트 크기
            },
            blockquote: {
              fontStyle: 'italic', // blockquote 기울임꼴
              borderLeftColor: '#E5E7EB', // blockquote 왼쪽 테두리 색상
            },
          },
        },
      },
      colors: {
        background: '#F5F5F5',
        darkgray: '#7D7D7D',
        mediumgray: '#C7C7C7',
        lightgray: '#EAEAEA',
        softblue: '#7593F4',
        gray: '#838383',
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
        status: 'linear-gradient(to bottom, #7593F4, #71ECFF)',
      },
    },
    plugins: [typography],
  },
} satisfies Config;
