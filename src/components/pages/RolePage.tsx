import LoginButton from '@/components/atoms/LoginButton';
import RoleSelectLogo from '@/components/molecules/RoleSelectLogo';

const RolePage = () => {
  return (
    <div>
      <RoleSelectLogo />
      <div>Programmer, Artist, Designer 중 하나를 선택해주세요.</div>
      <div></div>
      <LoginButton label='홈으로 이동하기' />
      <div>* 선택된 카테고리는 추후 변경할 수 있습니다.</div>
    </div>
  );
};

export default RolePage;
