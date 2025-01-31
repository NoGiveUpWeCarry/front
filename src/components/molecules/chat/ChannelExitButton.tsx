import Icon from '@/components/atoms/Icon';
import useAuthStore from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { Channel } from '@/types/channel.type';

interface Props {
  currentChannelId: Channel['channelId'];
}

const ChannelExitButton = ({ currentChannelId }: Props) => {
  const exitChannel = useChatStore((state) => state.exitChannel);
  const handleChannelExit = () => {
    if (window.confirm('현재 채팅방을 나가시겠습니까?')) {
      const userId = useAuthStore.getState().userInfo.userId;
      exitChannel(userId, currentChannelId!);
    } else {
      console.log('나가기 취소');
    }
  };

  return (
    <button
      onClick={handleChannelExit}
      aria-label='채팅방 나가기'
      className='flex items-center text-darkgray hover:text-[#333] h-[38px] gap-[5px]'
    >
      <div>나가기</div>
      <Icon type='exit' className='text-inherit w-[24px] h-[24px]' />
    </button>
  );
};

export default ChannelExitButton;
