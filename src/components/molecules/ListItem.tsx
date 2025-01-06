import Avatar, { AvatarProps } from '@/components/atoms/Avatar';
import {
  ItemButtonProps,
  ItemLabelProps,
  ItemSubtitleProps,
  ItemTitleProps,
  ListItemMainProps,
} from '@/types/ListItem.types';
import { cn } from '@/utils/cn';
import { Children, isValidElement, ReactNode } from 'react';

// 서브 컴포넌트

const ListItemAvatar = ({ size, src }: AvatarProps) => {
  return <Avatar size={size} src={src} />;
};

const ListItemTitle = ({ children = '홍길동', className }: ItemTitleProps) => {
  return <div className={className}>{children}</div>;
};

const ListItemSubtitle = ({
  children = '설명',
  className,
}: ItemSubtitleProps) => {
  return <div className={className}>{children}</div>;
};

const ListItemLabel = ({ children, className }: ItemLabelProps) => {
  return <div className={className}>{children}</div>;
};

const ListItemButton = ({
  children = '버튼',
  onClick,
  className,
}: ItemButtonProps) => {
  return (
    <button onClick={onClick} type='button' className={className}>
      {children}
    </button>
  );
};

const getListItemComponent = (children: ReactNode, type: any) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === type
  );
};

// 메인 컴포넌트
const ListItemMain = ({ children, className }: ListItemMainProps) => {
  const avatar = getListItemComponent(children, (<ListItemAvatar />).type);
  const title = getListItemComponent(children, (<ListItemTitle />).type);
  const subtitle = getListItemComponent(children, (<ListItemSubtitle />).type);
  const label = getListItemComponent(children, (<ListItemLabel />).type);
  const button = getListItemComponent(children, (<ListItemButton />).type);
  return (
    <div className={cn('flex', className)}>
      {avatar && <div>{avatar}</div>}
      <div className='flex flex-col'>
        {title && <div>{title}</div>}
        {subtitle && <div>{subtitle}</div>}
      </div>
      {label && <div>{label}</div>}
      {button && <div>{button}</div>}
    </div>
  );
};

export const ListItem = Object.assign(ListItemMain, {
  Avatar: ListItemAvatar,
  Title: ListItemTitle,
  Subtitle: ListItemSubtitle,
  Label: ListItemLabel,
  Button: ListItemButton,
});
