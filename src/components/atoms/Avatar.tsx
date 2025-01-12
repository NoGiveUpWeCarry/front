import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ImgHTMLAttributes } from 'react';

export const AvatarVariants = cva(`rounded-full object-cover`, {
  variants: {
    size: {
      xxs: 'w-[20px] h-[20px]',
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

const Avatar = ({
  size,
  className,
  src = '/src/assets/logos/PAD.svg',
  ...props
}: AvatarProps) => {
  return src ? (
    <img
      src={src}
      className={cn(AvatarVariants({ size, className }))}
      {...props}
    />
  ) : (
    <div className={cn(AvatarVariants({ size, className }))} />
  );
};

export default Avatar;
