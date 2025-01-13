import Button from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

interface MessageButtonProps {
  targetUserId: number;
}

const MessageButton = ({ targetUserId }: MessageButtonProps) => {
  const navigate = useNavigate();
  const clickMessageButton = () => {
    navigate('/chat', { state: { targetUserId } });
  };

  return (
    <Button
      height='92px'
      width='29px'
      radius='sm'
      variants='outline'
      onClick={clickMessageButton}
    >
      {targetUserId}
    </Button>
  );
};

export default MessageButton;
