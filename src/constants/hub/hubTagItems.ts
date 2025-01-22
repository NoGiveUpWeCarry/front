export const hubTagItems = {
  PROJECT: 'PROJECT',
  OUTSOURCING: 'OUTSOURCING',
} as const;

export type hubTagItemskey = keyof typeof hubTagItems;

export const hubTagItemsColors: Record<hubTagItemskey, string> = {
  PROJECT: 'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE] ',
  OUTSOURCING: 'bg-gradient-to-r from-[#FF8800] to-[#84FF74] ',
};
