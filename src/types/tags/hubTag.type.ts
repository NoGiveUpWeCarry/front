export type HubTagVariant = 'ONLINE' | 'OFFLINE' | 'OPEN' | 'CLOSE';

export interface HubTagProps {
  label: string;
  variant: HubTagVariant;
}
