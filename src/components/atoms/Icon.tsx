import React from 'react';
import {
  BellIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type IconType = 'bell' | 'mail' | 'home' | 'search' | 'star' | 'plus' | 'xmark';

interface IconProps {
  type: IconType;
  className?: string;
}

const Icon = ({ type, className = '' }: IconProps) => {
  const icons: { [key in IconType]: React.ReactNode } = {
    bell: <BellIcon className={className} />,
    mail: <EnvelopeIcon className={className} />,
    home: <HomeIcon className={className} />,
    search: <MagnifyingGlassIcon className={className} />,
    star: <StarIcon className={className} />,
    plus: <PlusIcon className={className} />,
    xmark: <XMarkIcon className={className} />,
  };

  return <>{icons[type]}</>;
};

export default Icon;
