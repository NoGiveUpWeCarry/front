export type MeetingTagVariant = 'ONLINE' | 'OFFLINE';

export interface MeetingTagProps {
  label: string;
  variant: MeetingTagVariant;
}
