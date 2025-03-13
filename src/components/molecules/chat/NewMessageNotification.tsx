import { forwardRef } from 'react';
import NewMessage from './NewMessage';

interface NewMessageNotificationProps {
  show: boolean;
  onClick: () => void;
}

export const NewMessageNotification = forwardRef<
  HTMLDivElement,
  NewMessageNotificationProps
>(({ show, onClick }, ref) => {
  return (
    <>
      <div ref={ref} />
      {show && <NewMessage onClick={onClick} />}
    </>
  );
});

NewMessageNotification.displayName = 'NewMessageNotification'; // React Devltools 에 표시되는 이름
