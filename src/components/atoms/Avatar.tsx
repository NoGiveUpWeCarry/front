import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ImgHTMLAttributes } from 'react';

export const AvatarVariants = cva(`rounded-full`, {
  variants: {
    size: {
      xs: 'w-[40px] h-[40px]',
      sm: 'w-[50px] h-[50px]',
      md: 'w-[80px] h-[80px]',
      lg: 'w-[120px] h-[120px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface AvatarProps
  extends VariantProps<typeof AvatarVariants>,
    ImgHTMLAttributes<HTMLImageElement> {}

const Avatar = ({ size, className, ...props }: AvatarProps) => {
  return <img {...props} className={cn(AvatarVariants({ size, className }))} />;
};

export default Avatar;