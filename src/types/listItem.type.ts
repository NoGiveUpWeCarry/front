import { MouseEvent, PropsWithChildren } from 'react';

interface ListItemProps extends PropsWithChildren {
  className?: string;
}

export interface ListItemColProps extends ListItemProps {}

export interface ItemMainProps extends ListItemProps {
  onClick?: () => void;
}

export interface ItemTitleProps extends ListItemProps {}

export interface ItemSubtitleProps extends ListItemProps {}

export interface ItemLabelProps extends ListItemProps {}

export interface ItemButtonProps extends ListItemProps {
  onClick?: (e: MouseEvent) => void;
}
