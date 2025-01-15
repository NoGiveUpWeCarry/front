export enum tagItem {
  고민 = '# 고민',
  회고 = '# 회고',
  아이디어 = '# 아이디어',
  계획 = '# 계획',
  토론 = '# 토론',
  정보공유 = '# 정보공유',
  추천 = '# 추천',
  질문 = '# 질문',
}

export const tagColors: Record<tagItem, string> = {
  [tagItem.고민]: 'bg-[#CDF4FF] text-[#729CFF]',
  [tagItem.회고]: 'bg-[#FFCDCD] text-[#FF5E5E]',
  [tagItem.아이디어]: 'bg-[#F3CDFF] text-[#CE5EFF]',
  [tagItem.계획]: 'bg-[#CDFFD0] text-[#00A103]',
  [tagItem.토론]: 'bg-[#B5BBFF] text-[#37007F]',
  [tagItem.정보공유]: 'bg-[#FFC9FB] text-[#FF58B7]',
  [tagItem.추천]: 'bg-[#DFC6B7] text-[#A96969]',
  [tagItem.질문]: 'bg-[#FFD8AB] text-[#FF8800]',
};
