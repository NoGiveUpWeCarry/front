import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

interface Props {
  onClose: (...data: any[]) => void;
}

const CloseButton = ({ onClose }: Props) => {
  return (
    <Button
      width='24px'
      height='24px'
      className='absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 text-[#CCCCCC]'
      onClick={onClose}
    >
      <Icon type='plus' color='gray' className='text-[#CCCCCC] rotate-45' />
    </Button>
  );
};

export default CloseButton;
