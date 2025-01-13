import LoginButton from '@/components/atoms/LoginButton';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_SERVER_URL}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_SERVER_URL}/auth/github`;
  };

  return (
    <div className='flex justify-center w-full min-h-svh'>
      <div className='w-[700px] min-h-full flex flex-col items-center gap-[20%] pt-[10%]'>
        <img src={DefaultLogo} alt='로고' className='w-[410px] h-[165px]' />
        <div className='flex flex-col gap-[20px]'>
          <LoginButton
            iconType='github'
            label='Github로 시작하기'
            onClick={handleGitHubLogin}
          />
          <LoginButton
            iconType='google'
            label='Google 시작하기'
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
