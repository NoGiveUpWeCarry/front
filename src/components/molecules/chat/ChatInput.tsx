import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import useAuthStore from '@/store/authStore';
import FileUploadDropdown, {
  FileUploadDropdownItem,
} from '@/components/organisms/chat/FileUploadDropdown';
import { FileUploader, useFileUpload } from '@/hooks/useFileUpload';
import FilePreview from '@/components/organisms/chat/FilePreview';

interface ChatInputProps {
  currentChannelId: number;
}

const ChatInput = ({ currentChannelId }: ChatInputProps) => {
  const [text, setText] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);
  const userInfo = useAuthStore.getState().userInfo;
  const imageUploader = useFileUpload(
    'image/png, image/jpg, image/jpeg, image/gif'
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmitFile = (fileUploader: FileUploader) => {
    if (!fileUploader.file) return;
    console.log('handleSubmitFile');
    // let type: string;
    // switch(fileUploader.accept) {
    //   case 'image/*':

    // }
    sendMessage({
      type: 'image',
      content: fileUploader.file,
      channelId: currentChannelId,
      userId: userInfo.userId,
    });

    fileUploader.unloadFile();
  };

  const handleSubmitText = () => {
    if (!text.trim()) return;

    sendMessage({
      type: 'text',
      content: text,
      channelId: currentChannelId,
      userId: userInfo.userId,
    });

    setText('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitFile(imageUploader);
    handleSubmitText();
  };

  const options: FileUploadDropdownItem[] = [
    {
      id: 1,
      label: '이미지 업로드',
      icon: <Icon type='photo' className='w-[30px] h-[30px]' color='white' />,
      fileUploader: imageUploader,
    },
  ];

  return (
    <div className='pb-[50px] px-[56px] mt-[50px]'>
      <FilePreview fileUploader={imageUploader} />
      <div className='flex items-center gap-[10px]'>
        <Avatar
          src={userInfo.profileUrl || undefined}
          className='h-[38px] w-[38px] relative z-10'
        />
        <form className='relative flex-1' onSubmit={handleSubmit}>
          <Input
            radius='lg'
            spacing='sm'
            className='h-[38px] px-[20px]'
            placeholder='텍스트를 입력하세요'
            onChange={handleInput}
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
        <FileUploadDropdown options={options} />
      </div>
    </div>
  );
};

export default ChatInput;
