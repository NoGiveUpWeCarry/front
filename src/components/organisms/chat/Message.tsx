import Avatar from '@/components/atoms/Avatar';
import MessageBubble from '@/components/atoms/MessageBubble';
import { ReceiveMeesage } from '@/types/chat.type';
import { Role } from '@/types/role.type';
import { cn } from '@/utils/cn';
import { memo } from 'react';

interface MessageProps {
  message: ReceiveMeesage;
  sameBefore: boolean; // 한 유저가 연속으로 보낸 메시지인지 유무
  isMyMessage: boolean;
  className?: string;
}

const Message = memo(
  ({ message, sameBefore, isMyMessage, className }: MessageProps) => {
    const { content, user } = message;
    return (
      <div
        className={cn(
          'flex gap-[10px]',
          isMyMessage && 'flex-row-reverse ml-auto',
          'max-w-[50%]',
          className
        )}
      >
        {sameBefore ? (
          <div className='w-[40px] shrink-0'></div>
        ) : (
          <Avatar src={user.profile_url} size='xs' />
        )}
        <div className={cn('flex flex-col', isMyMessage && 'items-end')}>
          {!sameBefore && (
            <div className='flex gap-[5px] items-center'>
              <div className='text-body1 font-semibold mb-[5px]'>
                {user.nickname}
              </div>
              <div className='text-caption2 font-medium text-gray'>
                {Role[user.role_id]}
              </div>
            </div>
          )}
          <MessageBubble content={content} />
        </div>
      </div>
    );
  }
);

export default Message;
