import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: string;
  height: string;
  bgColor?: string;
  borderColor?: string;
  variants: 'filled' | 'outline' | 'text';
  radius: 'sm' | 'md' | 'lg';
}

const Button = ({
  width,
  height,
  className,
  bgColor = 'white',
  borderColor,
  variants = 'filled',
  radius,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const buttonStyles = cva('inline-flex items-center justify-center', {
    variants: {
      variants: {
        filled: `text-white`,
        outline: `text-black`,
        text: 'text-black',
      },
      radius: {
        sm: 'rounded-[5px]',
        md: 'rounded-[10px]',
        lg: 'rounded-[20px]',
      },
    },
    defaultVariants: {
      variants: 'filled',
    },
  });

  return (
    <button
      className={clsx(
        buttonStyles({ variants, radius }),
        bgColor && bgColor,
        borderColor && `border border-${borderColor}`,
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
