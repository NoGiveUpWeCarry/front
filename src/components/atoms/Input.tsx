import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';

export const InputVariants = cva(
  `
    w-full placeholder-[#838383] text-[#000]
    focus:outline-none
    `,
  {
    variants: {
      fontSize: {
        sm: 'text-[12px]',
        md: 'text-body1',
        lg: 'text-[15px]',
      },
      bgColor: {
        transparent: 'bg-transparent',
        light: 'bg-[#FFFFFF]',
        medium: 'bg-[#EAEAEA]',
        dark: 'bg-[#D6D6D6]',
      },
      spacing: {
        sm: 'px-[10px] py-[6px]',
        md: 'px-[15px] py-[10px]',
      },
      radius: {
        sm: 'rounded-[5px]',
        md: 'rounded-[12px]',
        lg: 'rounded-[20px]',
      },
      borderColor: {
        light: 'border-[#DCDCDC]',
        medium: 'border-[#CCCCCC]',
        dark: 'border-[#838383]',
      },
    },
    defaultVariants: {
      fontSize: 'md',
      bgColor: 'medium',
      spacing: 'md',
      radius: 'md',
      borderColor: 'medium',
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {}

const Input = ({
  fontSize,
  bgColor,
  spacing,
  radius,
  borderColor,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        InputVariants({
          fontSize,
          bgColor,
          spacing,
          radius,
          borderColor,
          className,
        })
      )}
    />
  );
};

export default Input;