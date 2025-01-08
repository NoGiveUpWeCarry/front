import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';

const SideBar = () => {
  const menuItems: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    onClick?: () => void;
  }[] = [
    { type: 'bell', onClick: () => alert('Notifications clicked') },
    { type: 'mail', onClick: () => alert('Messages clicked') },
    { type: 'home', onClick: () => alert('Home clicked') },
    { type: 'search', onClick: () => alert('Search clicked') },
    { type: 'star', onClick: () => alert('Favorites clicked') },
  ];

  return (
    <div className='flex flex-col justify-between items-center w-[68px] h-screen px-[10px] py-[20px]'>
      <Logo />

      <Menu items={menuItems} />

      <Avatar src='/src/assets/images/example.svg' alt='User Avatar' />
    </div>
  );
};

export default SideBar;
