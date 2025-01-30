export const roleItems = {
  Programmer: 'PROGRAMMER',
  Artist: 'ARTIST',
  Designer: 'DESIGNER',
} as const;
export type roleItemsKey = keyof typeof roleItems;
export type roleItemsValue = (typeof roleItems)[keyof typeof roleItems];
