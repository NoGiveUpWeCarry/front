import { cn } from '@/utils/cn';

interface MessageBubbleProps {
  content: string;
  className?: string;
}

const MessageBubble = ({ content, className }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        'bg-[#EAFBFF] px-[10px] py-[7px] text-caption1 flex items-center w-fit rounded-[5px]',
        className
      )}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
