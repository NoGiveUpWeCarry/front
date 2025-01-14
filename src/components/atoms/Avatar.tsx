import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ImgHTMLAttributes } from 'react';

export const AvatarVariants = cva(`rounded-full object-cover`, {
  variants: {
    size: {
      xxs: 'w-[25px] h-[25px]',
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
  return props.src ? (
    <img {...props} className={cn(AvatarVariants({ size, className }))} />
  ) : (
    <div className={cn(AvatarVariants({ size, className }))} />
  );
};

export default Avatar;
