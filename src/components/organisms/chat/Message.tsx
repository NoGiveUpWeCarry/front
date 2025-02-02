import Avatar from '@/components/atoms/Avatar';
import ChatImageModal from '@/components/molecules/chat/ChatImageModal';
import MessageBubble from '@/components/molecules/chat/MessageBubble';
import { useModal } from '@/hooks/useModal';
import { useChatStore } from '@/store/chatStore';
import { ReceiveMessage } from '@/types/message.type';
import { Role } from '@/types/role.type';
import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/format';
import clsx from 'clsx';
import { memo } from 'react';

interface MessageProps {
  message: ReceiveMessage;
  sameBefore: boolean; // 한 유저가 연속으로 보낸 메시지인지 유무
  isMyMessage: boolean;
  handleImageLoad: () => void;
}

const Message = memo(
  ({ message, sameBefore, isMyMessage, handleImageLoad }: MessageProps) => {
    const { content, user, channelId } = message;
    const channel = useChatStore((state) => state.channels[channelId]);
    const { closeModal, isOpen, openModal } = useModal();
    const unreadCount = channel.users.length - message.readCount;
    return (
      <div
        className={cn(
          'flex gap-[10px]',
          isMyMessage && 'flex-row-reverse ml-auto',
          'max-w-[50%]',
          sameBefore ? 'mt-[10px]' : 'mt-[24px]'
        )}
      >
        {sameBefore ? (
          <div className='w-[40px] shrink-0'></div>
        ) : (
          <Avatar src={user.profileUrl || undefined} size='xs' />
        )}
        <div className={cn('flex flex-col', isMyMessage && 'items-end')}>
          {!sameBefore && (
            <div className='flex gap-[5px] items-center'>
              <div className='text-body1 font-semibold mb-[5px]'>
                {user.nickname}
              </div>
              <div className='text-caption2 font-medium text-gray'>
                {Role[user.roleId]}
              </div>
            </div>
          )}
          <div
            className={clsx(
              'flex items-end gap-[5px]',
              isMyMessage ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {message.type === 'image' && (
              <>
                <img
                  onLoad={handleImageLoad}
                  onClick={openModal}
                  src={message.content}
                  className='w-[300px] object-cover rounded-lg shadow'
                />
                {isOpen && (
                  <ChatImageModal src={message.content} onClose={closeModal} />
                )}
              </>
            )}
            {message.type === 'text' && (
              <MessageBubble
                content={content}
                messageId={message.messageId}
                isMyMessage={isMyMessage}
              />
            )}
            <div className='text-caption2 text-darkgray'>
              {formatTime(message.date)}
            </div>
            <div className='text-caption2 text-yellow-500'>
              {unreadCount || undefined}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Message;
