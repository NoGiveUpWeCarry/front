import Date from '@/components/atoms/Date';
import ExitMessage from '@/components/molecules/chat/ExitMessage';
import Message from '@/components/organisms/chat/Message';
import useAuthStore from '@/store/authStore';
import { ReceiveMessage } from '@/types/message.type';
import { formatDateMessages } from '@/utils/format';
import { Fragment } from 'react/jsx-runtime';
interface MessagesProps {
  messages: ReceiveMessage[];
  searchMessageId?: number | null;
  handleImageLoad: () => void;
}

const Messages = ({
  messages,
  searchMessageId,
  handleImageLoad,
}: MessagesProps) => {
  const dateMessages = Object.entries(formatDateMessages(messages));

  // 유저 정보 관련 로직
  const user = useAuthStore.getState().userInfo;
  const myUserId = user.userId;

  return dateMessages.map(([date, messages]) => {
    return (
      <Fragment key={date}>
        <Date className='text-gray text-caption2 text-center mt-[20px]'>
          {date}
        </Date>
        {messages.map((message, i) => {
          if (message.type === 'exit') {
            return <ExitMessage key={message.messageId} message={message} />;
          }

          const isMyMessage = message.user.userId === myUserId;
          const sameBefore =
            i > 0 && message.user.userId === messages[i - 1]?.user?.userId;
          return (
            <Message
              key={message.messageId}
              message={message}
              sameBefore={sameBefore}
              isMyMessage={isMyMessage}
              handleImageLoad={handleImageLoad}
              searchMessageId={searchMessageId}
            />
          );
        })}
      </Fragment>
    );
  });
};

export default Messages;
