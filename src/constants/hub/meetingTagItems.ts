export const meetingTagItems = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
} as const;

export type MeetingTagItemskey = keyof typeof meetingTagItems;

export type MeetingTagItemsValue =
  (typeof meetingTagItems)[keyof typeof meetingTagItems];
export const meetingTagItemsColors: Record<MeetingTagItemskey, string> = {
  ONLINE:
    'bg-gradient-to-r from-[#039160] to-[#96FFDA] text-[14px] rounded-full',
  OFFLINE:
    'bg-gradient-to-r from-[#FF383B] to-[#FFBCBD] text-[14px] rounded-full',
};
