import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import { useNotification } from '@/components/organisms/sse/NotificationProvider';

interface NotificationItemProps {
  message: {
    notificationId: number;
    senderProfileUrl?: string;
    message: string;
    timestamp: string;
  };
  onDelete: () => void;
}

const NotificationItem = ({ message, onDelete }: NotificationItemProps) => {
  return (
    <div
      key={message.notificationId}
      className='flex w-full justify-start text-[14px] items-center gap-[10px] '
    >
      <Avatar src={message.senderProfileUrl} size='xs' />
      <div>
        <div>{message.message}</div>
        <div className='text-[12px] text-gray-500'>{message.timestamp}</div>
      </div>
      <div onClick={onDelete}>
        <Icon
          type='trash'
          color='black'
          className='w-[20px] h-[20px] cursor-pointer'
        />
      </div>
    </div>
  );
};

interface MobileNotificationProps {
  isOpen: boolean;
}

const MobileNotification = ({ isOpen }: MobileNotificationProps) => {
  const { messages, markNotificationAsRead } = useNotification();

  if (!isOpen) return null;

  return (
    <div className='absolute mt-3 px-1 py-2 flex w-full flex-col items-center gap-2 bg-white'>
      <div className='text-[18px] font-semibold text-[#48484a]'>알림 📫</div>
      {messages.length === 0 ? (
        <div className='text-[16px] text-[#828282]'>
          현재 새로운 알림이 없습니다.
        </div>
      ) : (
        <div className='flex w-full flex-col gap-[20px]'>
          {messages.map((message) => (
            <NotificationItem
              key={message.notificationId}
              message={message}
              onDelete={() => markNotificationAsRead(message.notificationId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNotification;
