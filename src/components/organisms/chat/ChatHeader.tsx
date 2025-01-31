import { PropsWithChildren } from 'react';

interface ChatHeaderProps extends PropsWithChildren {}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>{children}</div>
    </div>
  );
};

export default ChatHeader;
