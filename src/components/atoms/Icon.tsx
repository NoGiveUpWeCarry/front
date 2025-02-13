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
  ChevronLeftIcon,
  CalendarIcon,
  BriefcaseIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  EllipsisHorizontalCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowLongUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  H1Icon,
} from '@heroicons/react/24/outline';
import {
  UserCircleIcon,
  UserGroupIcon,
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from '@heroicons/react/24/solid';
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
  | 'likeSolid'
  | 'eye'
  | 'bookmark'
  | 'user'
  | 'behind'
  | 'calendar'
  | 'clock'
  | 'roledetail'
  | 'workflow'
  | 'arrow'
  | 'join'
  | 'photo'
  | 'logout'
  | 'EllipsisHorizontalCircle'
  | 'trash'
  | 'pencilSquare'
  | 'arrowLongUp'
  | 'chatBubbleOvalLeftEllipsis'
  | 'bookmarkSolid'
  | 'exit'
  | 'list'
  | 'h1';

const iconVariants = cva('', {
  variants: {
    color: {
      black: 'text-black',
      white: 'text-white',
      gray: 'text-[#838383]',
      red: 'text-[#FF5E5E]',
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
    behind: (
      <ChevronLeftIcon className={cn(iconVariants({ color }), className)} />
    ),
    clock: <ClockIcon className={cn(iconVariants({ color }), className)} />,
    roledetail: (
      <BriefcaseIcon className={cn(iconVariants({ color }), className)} />
    ),
    calendar: (
      <CalendarIcon className={cn(iconVariants({ color }), className)} />
    ),
    workflow: (
      <ChatBubbleLeftRightIcon
        className={cn(iconVariants({ color }), className)}
      />
    ),
    arrow: <ArrowUpIcon className={cn(iconVariants({ color }), className)} />,
    photo: <PhotoIcon className={cn(iconVariants({ color }), className)} />,
    join: <UserGroupIcon className={cn(iconVariants({ color }), className)} />,
    logout: (
      <ArrowUpTrayIcon
        className={cn(iconVariants({ color }), className, 'rotate-90')}
      />
    ),
    EllipsisHorizontalCircle: (
      <EllipsisHorizontalCircleIcon
        className={cn(iconVariants({ color }), className)}
      />
    ),
    trash: <TrashIcon className={cn(iconVariants({ color }), className)} />,
    pencilSquare: (
      <PencilSquareIcon className={cn(iconVariants({ color }), className)} />
    ),
    arrowLongUp: (
      <ArrowLongUpIcon className={cn(iconVariants({ color }), className)} />
    ),
    chatBubbleOvalLeftEllipsis: (
      <ChatBubbleOvalLeftEllipsisIcon
        className={cn(iconVariants({ color }), className)}
      />
    ),
    exit: (
      <ArrowRightStartOnRectangleIcon
        className={cn(iconVariants({ color }), className)}
      />
    ),
    likeSolid: (
      <HeartSolidIcon className={cn(iconVariants({ color }), className)} />
    ),
    bookmarkSolid: (
      <BookmarkSolidIcon className={cn(iconVariants({ color }), className)} />
    ),
    list: <ListBulletIcon className={cn(iconVariants({ color }), className)} />,
    h1: <H1Icon className={cn(iconVariants({ color }), className)} />,
  };

  return <>{icons[type]}</>;
};

export default Icon;
