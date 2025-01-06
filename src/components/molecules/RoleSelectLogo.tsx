import { useState } from 'react';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';
import ProgrammerLogo from '@/assets/logos/ProgrammerLogo.svg';
import DesignerLogo from '@/assets/logos/DesignerLogo.svg';
import ArtistLogo from '@/assets/logos/ArtistLogo.svg';

const RoleSelectLogo = () => {
  const [logo, setLogo] = useState<string>(ProgrammerLogo);

  const handleHover = (role: string) => {
    if (role === 'P') {
      setLogo(ProgrammerLogo);
    } else if (role === 'A') {
      setLogo(ArtistLogo);
    } else if (role === 'D') {
      setLogo(DesignerLogo);
    }
  };

  return (
    <div className='relative flex justify-center items-center w-[410px] h-[165px]'>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover('P')}
        onMouseLeave={() => setLogo(DefaultLogo)}
        onClick={() => setLogo(ProgrammerLogo)}
      ></div>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover('A')}
        onClick={() => setLogo(ArtistLogo)}
        onMouseLeave={() => setLogo(DefaultLogo)}
      ></div>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover('D')}
        onClick={() => setLogo(DesignerLogo)}
        onMouseLeave={() => setLogo(DefaultLogo)}
      ></div>
      <div className='absolute'>
        <img src={logo} alt='Role Logo' className='max-w-full max-h-full' />
      </div>
    </div>
  );
};

export default RoleSelectLogo;
