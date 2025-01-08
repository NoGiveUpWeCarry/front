import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();

  const isLoggedIn = false;

  const menuItems: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    onClick?: () => void;
  }[] = [
    { type: 'bell', onClick: () => alert('네비게이션 걸어주세요') },
    { type: 'mail', onClick: () => alert('네비게이션 걸어주세요') },
    { type: 'home', onClick: () => navigate('/') },
    { type: 'search', onClick: () => alert('네비게이션 걸어주세요') },
    { type: 'star', onClick: () => navigate('/connectionhub') },
  ];

  return (
    <div className='flex flex-col justify-between items-center h-full py-[20px]'>
      <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
        <Logo />
      </div>

      <Menu items={menuItems} />

      <div>
        <Avatar
          size='sm'
          src={
            isLoggedIn
              ? '/src/assets/images/Genericavatar.svg' // api 연결 후 변경
              : '/src/assets/Genericavatar.svg'
          }
          alt='User Avatar'
        />
      </div>
    </div>
  );
};

export default SideMenu;
