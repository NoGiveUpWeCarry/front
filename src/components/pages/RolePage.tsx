import LoginButton from '@/components/atoms/LoginButton';
import RoleSelectLogo from '@/components/molecules/RoleSelectLogo';
import { useRoleMutation } from '@/hooks/queries/auth.query';
import { Role } from '@/types/role.type';
import { useState } from 'react';

const RolePage = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const roleMutation = useRoleMutation();

  const getTextColor = (role: Role) => {
    return selectedRole === role ? 'text-blue-500 font-bold' : 'text-gray-500';
  };

  const handleRoleChange = (role: Role) => {
    roleMutation.mutate(
      { userRole: role },
      {
        onSuccess: (data) => {
          setMessage(data.message.text);
        },
        onError: () => {
          setMessage('역할 변경 중 오류가 발생했습니다.');
        },
      }
    );
  };

  return (
    <div className='flex justify-center w-full min-h-svh'>
      <div className='w-[700px] min-h-full flex flex-col items-center gap-[20%] pt-[10%]'>
        <RoleSelectLogo
          selectedRole={selectedRole}
          setSelectedRole={(role: Role) => {
            setSelectedRole(role);
            role && handleRoleChange(role);
          }}
        />
        <div className='flex gap-2'>
          <p className={getTextColor(Role.Programmer)}>Programmer</p>
          <p className={getTextColor(Role.Artist)}>Artist</p>
          <p className={getTextColor(Role.Designer)}>Designer</p>
          <span> 중 하나를 선택해주세요.</span>
        </div>
        {message && <div className='text-green-500'>{message}</div>}
        <LoginButton label='홈으로 이동하기' />
        <div>* 선택된 카테고리는 추후 변경할 수 있습니다.</div>
      </div>
    </div>
  );
};

export default RolePage;
