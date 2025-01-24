import { HubItemType } from '@/mocks/mock-data/hubItem';

interface IProps extends HubItemType {
  onClick: () => void;
}

const ShortProject = ({ onClick, ...props }: IProps) => {
  const { hubTags, role, startDate, duration, title } = props;

  return (
    <div
      className='w-full flex flex-col gap-[8px] cursor-pointer'
      onClick={onClick}
    >
      <div className='flex gap-[10px] items-center'>
        <div className='bg-project text-[11px] font-extrabold text-white w-[79px] h-[25px] rounded-[100px] flex justify-center items-center'>
          {/* TODO: 확인 필요 / projectTags 존재하지 않음 -> hubTags로 수정 */}
          {hubTags[0]}
        </div>
        <p className='text-[16px] font-medium line-clamp-2'>{title}</p>
      </div>
      <div className='flex gap-[10px] items-center'>
        <span className='text-[14px] font-extrabold'>{role}</span>
        <span className='text-[10px] text-[#838383]'>
          시작 예정일 : {startDate} | 예상 기간: {duration}
        </span>
      </div>
    </div>
  );
};

export default ShortProject;
