import Button from '@/components/atoms/Button';
import {
  FeedSelect,
  HubSelect,
} from '@/components/atoms/contents/ContentsSelect';
import { ContentsToggle } from '@/components/atoms/contents/ContentsToggle';
import { Plus } from 'lucide-react';

export const FeedContentsTop = () => {
  return (
    <div className='flex flex-col items-start gap-[20px]'>
      <div className='flex w-full justify-between items-center border border-gray-300 rounded-lg p-1'>
        <ContentsToggle />
        <Button
          width='90px'
          height='50px'
          variants='filled'
          radius='md'
          className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-md'
        >
          <Plus className='mr-2 w-5 h-5' /> 새 피드
        </Button>
      </div>
      <FeedSelect />
    </div>
  );
};

export const HubContentsTop = () => {
  return (
    <div className='flex flex-col items-start gap-[20px]'>
      <div className='flex w-full justify-between items-center border border-gray-300 rounded-lg p-1'>
        <div className='flex items-center gap-[10px]'>
          <ContentsToggle />
          <HubSelect />
        </div>

        <Button
          width='90px'
          height='50px'
          variants='filled'
          radius='md'
          className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-md'
        >
          <Plus className='mr-2 w-5 h-5' /> 새 허브
        </Button>
      </div>
    </div>
  );
};
