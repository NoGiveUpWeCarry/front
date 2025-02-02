import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import Popup from '@/components/molecules/Popup';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import FeedContentsUserTitle from '@/components/atoms/contents/FeedContentsUserTitle';

interface ContentsUserProps {
  userProfileUrl: string;
  createdAt: string;
  name: string;
  userRole: string;
  userId?: number;
}

const ContentsUser = ({
  createdAt,
  name,
  userRole,
  userProfileUrl,
  userId,
}: ContentsUserProps) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const { userInfo } = useAuthStore(useShallow((state) => state));

  return (
    <div className='flex items-start space-x-3'>
      <div
        className='cursor-pointer relative'
        onClick={() =>
          userId === userInfo?.userId
            ? navigate(`/@${userInfo?.nickname}`)
            : isOpen
              ? closeModal()
              : openModal()
        }
      >
        <Avatar
          src={userProfileUrl}
          size='xs'
          alt={`${name} Avatar`}
          className='object-cover'
        />
        {isOpen && (
          <Popup
            position='bottom'
            popupHandler={[
              {
                onClick: () => navigate(`/@${name}`),
                text: '마이페이지',
                icon: <Icon type='user' className='w-4' />,
              },
              {
                onClick: () =>
                  navigate('/chat', { state: { targetUserId: userId } }),
                text: '메세지 보내기',
                icon: <Icon type='mail' className='w-4' />,
              },
            ]}
            className='text-[13px]'
          />
        )}
      </div>
      <FeedContentsUserTitle
        userNickname={name}
        userRole={userRole}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ContentsUser;
