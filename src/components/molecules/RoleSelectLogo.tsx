import DefaultLogo from '@/assets/logos/DefaultLogo.svg';
import ProgrammerLogo from '@/assets/logos/ProgrammerLogo.svg';
import DesignerLogo from '@/assets/logos/DesignerLogo.svg';
import ArtistLogo from '@/assets/logos/ArtistLogo.svg';
import { Role } from '@/constants/Role';

interface RoleSelectLogoProps {
  selectedRole: Role | null;
  setSelectedRole: (role: Role | null) => void; // 수정된 타입
}

const RoleSelectLogo: React.FC<RoleSelectLogoProps> = ({
  selectedRole,
  setSelectedRole,
}) => {
  const getLogoByRole = (role: Role | null): string => {
    switch (role) {
      case Role.Programmer:
        return ProgrammerLogo;
      case Role.Artist:
        return ArtistLogo;
      case Role.Designer:
        return DesignerLogo;
      default:
        return DefaultLogo;
    }
  };

  const handleHover = (role: Role) => {
    setSelectedRole(role);
  };

  const handleLeave = () => {
    setSelectedRole(null);
  };

  return (
    <div className='relative flex justify-center items-center w-[420px] h-[165px]'>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover(Role.Programmer)}
        onMouseLeave={handleLeave}
        onClick={() => setSelectedRole(Role.Programmer)} // 클릭 시 setSelectedRole 호출
      ></div>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover(Role.Artist)}
        onMouseLeave={handleLeave}
        onClick={() => setSelectedRole(Role.Artist)} // 클릭 시 setSelectedRole 호출
      ></div>
      <div
        className='w-[136px] h-full cursor-pointer z-10'
        onMouseEnter={() => handleHover(Role.Designer)}
        onMouseLeave={handleLeave}
        onClick={() => setSelectedRole(Role.Designer)} // 클릭 시 setSelectedRole 호출
      ></div>
      <div className='absolute'>
        <img
          src={getLogoByRole(selectedRole)}
          alt='Role Logo'
          className='max-w-full max-h-full'
        />
      </div>
    </div>
  );
};

export default RoleSelectLogo;
