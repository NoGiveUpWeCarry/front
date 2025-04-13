import { useEffect } from 'react';
import NewMessage from './NewMessage';
import { useInView } from 'react-intersection-observer';

interface Props {
  onClick: () => void;
  hasNewMessage: boolean;
  setChatState: (state: Partial<{ hasNewMessage: boolean }>) => void;
}

export const NewMessageNotification = ({
  onClick,
  hasNewMessage,
  setChatState,
}: Props) => {
  const { ref: newMessageRef, inView: isNewMessageInView } = useInView();
  console.log({ hasNewMessage, isNewMessageInView });
  useEffect(() => {
    if (isNewMessageInView) {
      setChatState({ hasNewMessage: false });
    }
  }, [isNewMessageInView]);

  return (
    <>
      <div ref={newMessageRef} className='sr-only w-1 h-1 static' />
      {hasNewMessage && !isNewMessageInView && <NewMessage onClick={onClick} />}
    </>
  );
};

NewMessageNotification.displayName = 'NewMessageNotification'; // React Devltools 에 표시되는 이름
