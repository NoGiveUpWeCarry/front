import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes, PropsWithChildren } from 'react';

const TitleVariants = cva('', {
  variants: {
    fontWeight: {
      medium: 'font-medium',
      bold: 'font-semibold',
    },
    size: {
      xs: 'text-[14px]',
      sm: 'text-[20px]',
      md: 'text-[25px]',
      lg: 'text-[30px]',
      xl: 'text-[35px]',
    },
    lineClamp: {
      none: 'line-clamp-none',
      1: 'text-ellipsis break-all line-clamp-1',
      2: 'text-ellipsis break-all line-clamp-2',
    },
  },
  defaultVariants: {
    fontWeight: 'bold',
    size: 'md',
    lineClamp: 'none',
  },
});

export interface TitleProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof TitleVariants> {}

const Title = ({
  children,
  className,
  fontWeight,
  lineClamp,
  size,
  ...props
}: TitleProps) => {
  return (
    <div
      {...props}
      className={cn(TitleVariants({ lineClamp, fontWeight, size, className }))}
    >
      {children}
    </div>
  );
};

export default Title;
