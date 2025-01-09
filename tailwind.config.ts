import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        background: '#f5f5f5',
        darkgray: '#7D7D7D',
        mediumgray: '#C7C7C7',
        lightgray: '#EAEAEA',
        softblue: '#7593F4',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    plugins: [],
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
