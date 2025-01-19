import Button from '@/components/atoms/Button';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
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
      width='92px'
      height='29px'
      radius='sm'
      variants='outline'
      className='font-semibold text-[15px] flex items-center justify-center gap-[10px] border border-black'
      onClick={clickMessageButton}
    >
      메세지 <EnvelopeIcon width={18} />
    </Button>
  );
};

export default MessageButton;
