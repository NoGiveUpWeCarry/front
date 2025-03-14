export const tagItem = {
  고민: '1',
  회고: '2',
  아이디어: '3',
  계획: '4',
  토론: '5',
  정보공유: '6',
  추천: '7',
  질문: '8',
} as const;

export type TagItemKey = keyof typeof tagItem;
export type TagItemValue = (typeof tagItem)[keyof typeof tagItem];
export const tagColors: Record<TagItemKey, string> = {
  고민: 'bg-[#CDF4FF] text-[#3966d0]',
  회고: 'bg-[#FFCDCD] text-[#b72424]',
  아이디어: 'bg-[#F3CDFF] text-[#8a38ad]',
  계획: 'bg-[#CDFFD0] text-[#285c29]',
  토론: 'bg-[#B5BBFF] text-[#37007F]',
  정보공유: 'bg-[#FFC9FB] text-[#8d4961]',
  추천: 'bg-[#DFC6B7] text-[#6e4e4e]',
  질문: 'bg-[#FFD8AB] text-[#915050]',
};
