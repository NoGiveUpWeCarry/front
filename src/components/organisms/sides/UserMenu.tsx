import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/queries/auth.query';
import useAuthStore from '@/store/authStore';
import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';

const UserMenu = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn, userInfo } = useAuthStore();
  const { mutate } = useLogout();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  return (
    <div ref={menuRef} className='relative'>
      <Avatar
        size='sm'
        className='cursor-pointer'
        onClick={() => setShowMenu((prev) => !prev)}
      />

      {showMenu && (
        <div className='absolute top-10 left-0 bg-white rounded-lg shadow-lg w-48 p-2'>
          <button
            onClick={() =>
              navigate(isLoggedIn ? `/@${userInfo?.nickname}` : '/login')
            }
            className='flex items-center gap-2 p-2 hover:bg-gray-100'
          >
            <Icon type='user' />
            {isLoggedIn ? '마이페이지' : '로그인'}
          </button>
          <button
            onClick={() =>
              isLoggedIn
                ? mutate(undefined, { onSuccess: logout })
                : navigate('/signup')
            }
            className='flex items-center gap-2 p-2 hover:bg-gray-100'
          >
            <Icon type={isLoggedIn ? 'logout' : 'join'} />
            {isLoggedIn ? '로그아웃' : '회원가입'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
