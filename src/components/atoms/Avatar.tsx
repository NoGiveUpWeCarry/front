import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ImgHTMLAttributes } from 'react';
import defaultAvatar from '@/assets/images/avatar.svg';

export const AvatarVariants = cva(`rounded-full object-cover`, {
  variants: {
    size: {
      xxxs: 'w-7 h-7',
      xxs: 'w-[25px] h-[25px]',
      xs: 'w-[40px] h-[40px]',
      sm: 'w-[50px] h-[50px]',
      md: 'w-[80px] h-[80px]',
      lg: 'w-[120px] h-[120px]',
      gg: 'w-[30px] h-[30px]',
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
  src = defaultAvatar,
  ...props
}: AvatarProps) => {
  return (
    <img
      src={src}
      className={cn(AvatarVariants({ size, className }))}
      {...props}
    />
  );
};

export default Avatar;
