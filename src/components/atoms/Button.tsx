import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: string;
  height: string;
  variants?: 'filled' | 'outline' | 'text';
  radius: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const Button = ({
  width,
  height,
  className,
  variants = 'filled',
  radius,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const buttonStyles = cva(
    'inline-flex items-center justify-center cursor-pointer',
    {
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
          full: 'rounded-full',
        },
      },
      defaultVariants: {
        variants: 'filled',
      },
    }
  );

  return (
    <button
      className={cn(buttonStyles({ variants, radius }), className)}
      style={{ width, height }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
