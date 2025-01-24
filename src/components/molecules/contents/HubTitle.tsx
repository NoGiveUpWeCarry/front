import ContentsTitle from '@/components/atoms/contents/ContentsTitle';
import { hubTagItemsColors, HubTagItemsKey } from '@/constants/hub/hubTagItems';

export interface HubTitleProps {
  hubTags: HubTagItemsKey;
  title: string;
}

const HubTitle = ({ hubTags, title }: HubTitleProps) => {
  return (
    <div className='flex w-full gap-[10px]'>
      <div className='flex items-start justify-center text-white'>
        <span
          className={`${hubTagItemsColors[hubTags]} text-[14px] rounded-full px-2 py-1 font-medium' `}
        >
          {hubTags}
        </span>
      </div>
      <div className='flex'>
        <ContentsTitle title={title} />
      </div>
    </div>
  );
};

export default HubTitle;
