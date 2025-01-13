import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SendMessage } from '@/types/chat.type';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';
import { user } from '@/mocks/user.mock';

const ChatInput = () => {
  const [content, setContent] = useState('');
  const { sendMessage } = useChatStore(
    useShallow((state) => ({
      sendMessage: state.sendMessage,
    }))
  );
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message: Omit<SendMessage, 'channelId'> = {
      type: 'text',
      content: content,
      user: user,
    };
    setContent('');
    sendMessage(message);
  };
  return (
    <div className='flex items-center gap-[10px]'>
      <Avatar src={user.profile_url} className='h-[38px] w-[38px]' />
      <form className='relative flex-1' onSubmit={handleSubmit}>
        <Input
          radius='lg'
          spacing='sm'
          className='h-[38px] px-[20px]'
          onChange={handleInput}
          value={content}
        />
        <Button
          width='30px'
          height='30px'
          radius='full'
          variants='text'
          className='bg-white absolute -right-[5px] top-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
          <Icon type='arrow' className='w-[20px] h-[20px]' />
        </Button>
      </form>
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
