import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import { NotificationMessage } from '@/components/organisms/sse/NotificationProvider';

const NotificationItem = ({
  message,
  onDelete,
}: {
  message: NotificationMessage;
  onDelete: (notificationId: number) => void;
}) => {
  return (
    <div
      key={message.notificationId}
      className='flex w-full justify-start text-[14px] items-center gap-[10px]'
    >
      <Avatar src={message.senderProfileUrl || undefined} size='xs' />
      <div>
        <div>{message.message}</div>
        <div className='text-[12px] text-gray-500'>{message.timestamp}</div>
      </div>
      <div onClick={() => onDelete(message.notificationId)}>
        <Icon
          type='trash'
          color='black'
          className='w-[20px] h-[20px] cursor-pointer'
        />
      </div>
    </div>
  );
};

interface NotificationListProps {
  messages: NotificationMessage[];
  onDelete: (notificationId: number) => void;
}

const NotificationList = ({ messages, onDelete }: NotificationListProps) => {
  if (messages.length === 0) {
    return (
      <div className='text-[16px] text-[#828282]'>
        현재 새로운 알림이 없습니다.
      </div>
    );
  }
  return (
    <div className='flex w-full flex-col gap-[20px]'>
      {messages.map((message) => (
        <NotificationItem
          key={message.notificationId}
          message={message}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationList;
