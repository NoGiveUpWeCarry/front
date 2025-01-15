import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import useAuthStore from '@/store/authStore';
import { ReceiveMessage } from '@/types/message.type';
import { formatDateMessages } from '@/utils/format';
import { Fragment } from 'react/jsx-runtime';

interface MessagesProps {
  messages: ReceiveMessage[];
}

const Messages = ({ messages }: MessagesProps) => {
  const dateMessages = formatDateMessages(messages);
  const user = useAuthStore.getState().userInfo!;
  const myUserId = user.userId;
  return (
    <>
      {messages.length ? (
        Object.entries(dateMessages).map(([date, messages], i) => {
          return (
            <Fragment key={i}>
              <Date className='text-gray text-caption2 text-center mt-[20px]'>
                {date}
              </Date>
              {messages.map((message, i) => {
                const isMyMessage = message.user.userId === myUserId;
                const sameBefore =
                  i > 0 && message.user.userId === messages[i - 1].user.userId;
                return (
                  <Message
                    key={i}
                    message={message}
                    sameBefore={sameBefore}
                    isMyMessage={isMyMessage}
                    className={sameBefore ? 'mt-[10px]' : 'mt-[24px]'}
                  />
                );
              })}
            </Fragment>
          );
        })
      ) : (
        <WelcomeMessage />
      )}
    </>
  );
};

export default Messages;
