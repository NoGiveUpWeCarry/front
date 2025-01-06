import { MouseEvent, ReactNode } from 'react';

interface ListItemProps {
  children?: ReactNode;
  className?: string;
}

export interface ListItemMainProps extends ListItemProps {}

export interface ItemTitleProps extends ListItemProps {}

export interface ItemSubtitleProps extends ListItemProps {}

export interface ItemLabelProps extends ListItemProps {}

export interface ItemButtonProps extends ListItemProps {
  onClick?: (e: MouseEvent) => void;
}
