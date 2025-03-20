import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import Popup from '@/components/molecules/Popup';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const SideMenuProfile = () => {
  const navigate = useNavigate();
  const { userInfo, isLoggedIn, logout } = useAuthStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      isLoggedIn: state.isLoggedIn,
      logout: state.logout,
    }))
  );

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='relative w-[50px] h-[50px]'>
      <Avatar
        size='sm'
        alt='User Avatar'
        className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
        src={userInfo?.profileUrl || undefined}
        onClick={() => setShowLogin((prev) => !prev)}
      />
      {showLogin &&
        (isLoggedIn ? (
          <Popup
            position='right'
            popupHandler={[
              {
                onClick: () => navigate(`/@${userInfo?.nickname}`),
                text: '마이페이지',
                icon: <Icon type='user' className='w-6' />,
              },
              {
                onClick: () => logout(),
                text: '로그아웃',
                icon: <Icon type='logout' className='w-6' />,
              },
            ]}
            innerClassname='top-[-30%]'
          />
        ) : (
          <Popup
            position='right'
            popupHandler={[
              {
                onClick: () => {
                  navigate('/login');
                  setShowLogin(false);
                },
                text: '로그인/회원가입',
                icon: <Icon type='user' className='w-6' />,
              },
            ]}
            innerClassname='top-[10px]'
          />
        ))}
    </div>
  );
};

export default SideMenuProfile;
