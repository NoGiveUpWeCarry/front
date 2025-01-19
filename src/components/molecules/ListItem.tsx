import {
  ItemButtonProps,
  ItemLabelProps,
  ItemSubtitleProps,
  ItemMainProps,
  ListItemColProps,
} from '@/types/listItem.type';
import { cn } from '@/utils/cn';
import { Children, isValidElement, ReactNode } from 'react';

const getListItemComponent = (children: ReactNode, type: any) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === type
  );
};

// 서브 컴포넌트

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

const ListItemCol = ({ children, className }: ListItemColProps) => {
  return (
    <div className={cn('flex flex-col justify-center w-fit', className)}>
      {children}
    </div>
  );
};

// 메인 컴포넌트
const ListItemMain = ({ children, className }: ItemMainProps) => {
  const cols = getListItemComponent(children, (<ListItemCol />).type);
  return <div className={cn('flex', className)}>{cols}</div>;
};

export const ListItem = Object.assign(ListItemMain, {
  Subtitle: ListItemSubtitle,
  Label: ListItemLabel,
  Button: ListItemButton,
  Col: ListItemCol,
});
