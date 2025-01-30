export const statusTagItems = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
} as const;

export type statusTagItemskey = keyof typeof statusTagItems;

export const statusTagItemsColors: Record<statusTagItemskey, string> = {
  OPEN: 'bg-gradient-to-r from-[#9340FF] to-[#FFDCDC] text-[14px] rounded-full',
  CLOSED:
    'bg-gradient-to-r from-[#000000] to-[#FFFFFF] text-[14px] rounded-full',
};
