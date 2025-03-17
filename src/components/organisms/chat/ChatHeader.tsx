import { PropsWithChildren } from 'react';

interface ChatHeaderProps extends PropsWithChildren {}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px] px-[20px] py-[10px]'>
      <div className='flex h-full items-center flex-grow-1 flex-shrink-0 flex-auto'>
        {children}
      </div>
    </div>
  );
};

export default ChatHeader;
