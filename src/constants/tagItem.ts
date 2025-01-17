export const tagItem = {
  고민: '# 고민',
  회고: '# 회고',
  아이디어: '# 아이디어',
  계획: '# 계획',
  토론: '# 토론',
  정보공유: '# 정보공유',
  추천: '# 추천',
  질문: '# 질문',
} as const;

export type TagItemKey = keyof typeof tagItem;

export const tagColors: Record<TagItemKey, string> = {
  고민: 'bg-[#CDF4FF] text-[#729CFF]',
  회고: 'bg-[#FFCDCD] text-[#FF5E5E]',
  아이디어: 'bg-[#F3CDFF] text-[#CE5EFF]',
  계획: 'bg-[#CDFFD0] text-[#00A103]',
  토론: 'bg-[#B5BBFF] text-[#37007F]',
  정보공유: 'bg-[#FFC9FB] text-[#FF58B7]',
  추천: 'bg-[#DFC6B7] text-[#A96969]',
  질문: 'bg-[#FFD8AB] text-[#FF8800]',
};
