import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import avatar from '@/assets/images/avatar.png';

const ChatInput = () => {
  return (
    <div className='flex items-center gap-[10px]'>
      <Avatar src={avatar} className='h-[38px] w-[38px]' />
      <div className='relative flex-1'>
        <Input radius='lg' spacing='sm' className='h-[38px] px-[20px]' />
        <Button
          width='30px'
          height='30px'
          radius='full'
          variants='text'
          className='bg-white absolute -right-[5px] top-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
          <Icon type='arrow' className='w-[20px] h-[20px]' />
        </Button>
      </div>
      <Button
        width='38px'
        height='38px'
        radius='full'
        variants='text'
        className='bg-white border-gray border-[1px]'
      >
        <Icon type='photo' className='w-[14px] h-[14px]' />
      </Button>
    </div>
  );
};

export default ChatInput;
