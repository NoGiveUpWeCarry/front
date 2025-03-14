import { useEffect } from 'react';
import NewMessage from './NewMessage';
import { useChatStore } from '@/store/chatStore';
import { useInView } from 'react-intersection-observer';

interface Props {
  onClick: () => void;
}

export const NewMessageNotification = ({ onClick }: Props) => {
  const setState = useChatStore((state) => state.setState);

  const hasNewMessage = useChatStore((state) => state.hasNewMessage);

  const { ref: newMessageRef, inView: isNewMessageInView } = useInView();

  useEffect(() => {
    if (isNewMessageInView) {
      setState({ hasNewMessage: false });
    }
  }, [isNewMessageInView]);

  return (
    <>
      <div ref={newMessageRef} />
      {hasNewMessage && !isNewMessageInView && <NewMessage onClick={onClick} />}
    </>
  );
};

NewMessageNotification.displayName = 'NewMessageNotification'; // React Devltools 에 표시되는 이름
