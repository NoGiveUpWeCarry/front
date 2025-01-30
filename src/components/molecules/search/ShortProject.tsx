import { ProjectResult } from '@/types/search.type';

interface IProps extends ProjectResult {
  onClick: () => void;
}

const ShortProject = ({ onClick, ...props }: IProps) => {
  return (
    <div
      className='w-full flex flex-col gap-[8px] cursor-pointer hover:bg-[#fafafa] hover:rounded-lg py-4'
      onClick={onClick}
    >
      <div className='flex gap-[10px] items-center'>
        <div className='bg-project text-[11px] font-extrabold text-white w-fit h-[25px] rounded-[100px] flex justify-center items-center px-3'>
          {props.hubType}
        </div>
        <p className='text-[16px] font-medium line-clamp-2'>{props.title}</p>
      </div>
      <div className='flex gap-[10px] items-center'>
        <span className='text-[14px] font-extrabold'>{props.role}</span>
        <span className='flex items-center text-[10px] text-[#838383]'>
          시작 예정일 : {props.startDate.split('T')[0].replaceAll('-', '.')}
          <div className='h-[10px] w-[1px] bg-[#BDBDBD] mx-[10px]'></div>
          예상 기간: {props.duration}
        </span>
      </div>
    </div>
  );
};

export default ShortProject;
