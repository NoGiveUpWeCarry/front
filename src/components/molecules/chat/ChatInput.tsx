import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const ChatInput = () => {
  return (
    <div className='relative'>
      <Input radius='lg' spacing='sm' />
      <Button
        width='30px'
        height='30px'
        radius='full'
        variants='text'
        className='bg-white absolute right-0'
      >
        아이콘
      </Button>
    </div>
  );
};

export default ChatInput;
