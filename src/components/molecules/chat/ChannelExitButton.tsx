import Icon from '@/components/atoms/Icon';
import useAuthStore from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';
import { cn } from '@/utils/cn';
import { MouseEvent } from 'react';

interface Props {
  channelId: Channel['channelId'];
  className?: HTMLElement['className'];
}

const ChannelExitButton = ({ channelId, className }: Props) => {
  const exitChannel = useChatStore((state) => state.exitChannel);
  const handleChannelExit = (e: MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('현재 채팅방을 나가시겠습니까?')) {
      const userId = useAuthStore.getState().userInfo.userId;
      exitChannel(userId, channelId);
    }
  };

  return (
    <button
      onClick={(e) => handleChannelExit(e)}
      aria-label='채팅방 나가기'
      className={cn(
        'flex items-center text-darkgray hover:text-[#333] h-[38px] gap-[5px]',
        className
      )}
    >
      <div>나가기</div>
      <Icon type='exit' className='text-inherit w-[24px] h-[24px]' />
    </button>
  );
};

export default ChannelExitButton;
