import React from 'react';
import * as HeroIconsOutline from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
  name: string;
  variant?: 'outline' | 'solid';
  className?: string;
}

const Icon = ({
  name,
  variant = 'outline',
  className = '',
  color,
}: IconProps) => {
  const IconComponent =
    variant === 'outline'
      ? (
          HeroIconsOutline as Record<
            string,
            React.ComponentType<{ className: string }>
          >
        )[name]
      : (
          HeroIconsSolid as Record<
            string,
            React.ComponentType<{ className: string }>
          >
        )[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Heroicons "${variant}" set.`);
    return null;
  }

  return <IconComponent className={cn(iconVariants({ color }), className)} />;
};

export default Icon;
