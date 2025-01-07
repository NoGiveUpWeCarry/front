import React from 'react';
import {
  BellIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PlusIcon,
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  EyeIcon,
  BookmarkIcon,
  ArrowUpIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

type IconType =
  | 'bell'
  | 'mail'
  | 'home'
  | 'search'
  | 'star'
  | 'plus'
  | 'xmark'
  | 'comment'
  | 'like'
  | 'eye'
  | 'bookmark'
  | 'user'
  | 'arrow'
  | 'photo';

const iconVariants = cva('', {
  variants: {
    color: {
      black: 'text-black',
      white: 'text-white',
      gray: 'text-[#838383]',
    },
  },
  defaultVariants: {
    color: 'black',
  },
});

interface IconProps extends VariantProps<typeof iconVariants> {
  type: IconType;
  className?: string;
}

const Icon = ({ type, className = '', color }: IconProps) => {
  const icons: { [key in IconType]: React.ReactNode } = {
    bell: <BellIcon className={cn(iconVariants({ color }), className)} />,
    mail: <EnvelopeIcon className={cn(iconVariants({ color }), className)} />,
    home: <HomeIcon className={cn(iconVariants({ color }), className)} />,
    search: (
      <MagnifyingGlassIcon className={cn(iconVariants({ color }), className)} />
    ),
    star: <StarIcon className={cn(iconVariants({ color }), className)} />,
    plus: <PlusIcon className={cn(iconVariants({ color }), className)} />,
    xmark: <XMarkIcon className={cn(iconVariants({ color }), className)} />,
    comment: (
      <ChatBubbleOvalLeftIcon
        className={cn(iconVariants({ color }), className)}
      />
    ),
    like: <HeartIcon className={cn(iconVariants({ color }), className)} />,
    eye: <EyeIcon className={cn(iconVariants({ color }), className)} />,
    bookmark: (
      <BookmarkIcon className={cn(iconVariants({ color }), className)} />
    ),
    user: <UserCircleIcon className={cn(iconVariants({ color }), className)} />,
    arrow: <ArrowUpIcon className={cn(iconVariants({ color }), className)} />,
    photo: <PhotoIcon className={cn(iconVariants({ color }), className)} />,
  };

  return <>{icons[type]}</>;
};

export default Icon;