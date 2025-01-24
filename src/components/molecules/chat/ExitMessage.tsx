import { ReceiveMessage } from '@/types/message.type';

interface ExitMessageProps {
  message: ReceiveMessage;
}

const ExitMessage = ({ message }: ExitMessageProps) => {
  return (
    <div className='flex justify-center'>
      <div className='text-caption1 text-darkgray'>{message.content}</div>
    </div>
  );
};

export default ExitMessage;
