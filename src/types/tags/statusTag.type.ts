export type StatusTagVariant = 'OPEN' | 'CLOSE';

export interface StatusTagProps {
  label: string;
  variant: StatusTagVariant;
}
