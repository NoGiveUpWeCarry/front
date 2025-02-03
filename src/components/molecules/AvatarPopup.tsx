import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import Popup from '@/components/molecules/Popup';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

interface IProps {
  nickname: string;
  userId: number;
  profileUrl: string | null;
  avatarSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  avatarClassname?: string;
  popupClassname?: string;
}

const AvatarPopup = ({
  nickname,
  userId,
  profileUrl,
  avatarSize,
  avatarClassname,
  popupClassname,
}: IProps) => {
  const navigate = useNavigate();
  const { userInfo, isLoggedIn } = useAuthStore(useShallow((state) => state));

  const { isOpen, openModal, closeModal } = useModal();

  const show = isOpen && userInfo?.nickname !== nickname;

  return (
    <div className='relative cursor-pointer flex items-center !h-fit'>
      <button
        onClick={() => {
          if (!isLoggedIn) return null;
          if (userId === userInfo?.userId) {
            navigate(`/@${userInfo?.nickname}`);
          } else {
            if (isOpen) {
              closeModal();
            } else {
              openModal();
            }
          }
        }}
        className='!h-fit'
      >
        <Avatar
          src={profileUrl || undefined}
          size={avatarSize}
          alt={`${nickname} Avatar`}
          className={`object-cover ${avatarClassname}`}
        />
      </button>
      {show && (
        <Popup
          innerClassname={`text-[13px] ${popupClassname}`}
          position='bottom'
          popupHandler={[
            {
              onClick: () => navigate(`/@${nickname}`),
              text: '마이페이지',
              icon: <Icon type='user' className='w-4' />,
            },
            {
              onClick: () => {
                navigate('/chat', { state: { targetUserId: userId } });
              },
              text: '메세지 보내기',
              icon: <Icon type='mail' className='w-4' />,
            },
          ]}
        />
      )}
    </div>
  );
};

export default AvatarPopup;
