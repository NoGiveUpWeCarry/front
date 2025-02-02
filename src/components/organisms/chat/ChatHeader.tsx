import Icon from '@/components/atoms/Icon';
import { useSidebarStore } from '@/store/sidebarStore';
import { PropsWithChildren } from 'react';

interface ChatHeaderProps extends PropsWithChildren {}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className='flex justify-between items-center border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px] px-[20px] py-[10px]'>
      <div className='flex h-full items-center flex-grow-1 flex-shrink-0 flex-auto'>
        <button
          className='w-[40px] h-full flex items-center xl:sr-only not-sr-only relative z-10'
          onClick={toggleSidebar}
        >
          <Icon type='list' />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ChatHeader;
