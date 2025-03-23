import Logo from '@/components/atoms/Logo';
import { useNavigate } from 'react-router-dom';

const SideMenuLogo = () => {
  const navigate = useNavigate();
  return (
    <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
      <Logo />
    </div>
  );
};

export default SideMenuLogo;
