import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { FormEvent, useMemo, useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import useAuthStore from '@/store/authStore';
import FileUploadDropdown from '@/components/organisms/chat/FileUploadDropdown';
import FilePreview from '@/components/organisms/chat/FilePreview';
import { FileContext, useFileContext } from '@/context/useFileContext';
import queryClient from '@/utils/queryClient';
import { InfiniteData } from '@tanstack/react-query';
import {
  FetchChannelMessagesResponse,
  ReceiveMessage,
} from '@/types/message.type';

const ChatForm = ({
  currentChannelId,
  senderId,
}: {
  currentChannelId: number;
  senderId: number;
}) => {
  const sendMessage = useChatStore((state) => state.sendMessage);
  const { file, setFile } = useFileContext();
  const [text, setText] = useState('');

  const submitFile = async (file: File) => {
    sendMessage({
      type: 'image',
      content: file,
      channelId: currentChannelId,
      userId: senderId,
    });

    setFile(null);
  };

  const submitText = (text: string) => {
    sendMessage({
      type: 'text',
      content: text,
      channelId: currentChannelId,
      userId: senderId,
    });
    queryClient.setQueryData(
      ['messages', { channelId: currentChannelId }],
      (old: InfiniteData<FetchChannelMessagesResponse>) => {
        const userInfo = useAuthStore.getState().userInfo;
        const lastMessage: ReceiveMessage = {
          type: 'text',
          content: text,
          channelId: currentChannelId,
          userId: senderId,
          messageId: old.pages[0].messages[0].messageId + 1,
          date: new Date().toISOString(),
          user: userInfo,
          readCount: 1,
        };

        old.pages[0].messages.unshift(lastMessage);
        return old;
      }
    );

    setText('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (file) submitFile(file);
    if (text.trim()) submitText(text);
  };

  return (
    <form className='relative flex-1' onSubmit={handleSubmit}>
      <Input
        radius='lg'
        spacing='sm'
        className='h-[38px] px-[20px]'
        placeholder='텍스트를 입력하세요'
        onChange={(e) => setText(e.target.value)}
        value={text}
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
  );
};

const ChatInput = ({ currentChannelId }: { currentChannelId: number }) => {
  const userInfo = useAuthStore.getState().userInfo;
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileContext.Provider value={useMemo(() => ({ file, setFile }), [file])}>
      <div className='md:pb-[50px] md:px-[56px] md:mt-[50px]'>
        <FilePreview />
        <div className='flex items-center gap-[10px]'>
          <Avatar
            src={userInfo.profileUrl || undefined}
            className='h-[38px] w-[38px] relative z-10'
          />
          <ChatForm
            currentChannelId={currentChannelId}
            senderId={userInfo.userId}
          />
          <FileUploadDropdown />
        </div>
      </div>
    </FileContext.Provider>
  );
};

export default ChatInput;
