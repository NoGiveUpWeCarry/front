import LoginButton from '@/components/atoms/LoginButton';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // 구글 로그인 요청을 백엔드로 보내도록 리디렉션
    window.location.href = 'http://your-backend-domain.com/auth/google';
  };
  return (
    <div className='flex justify-center w-full min-h-svh'>
      <div className='w-[700px] min-h-full flex flex-col items-center gap-[20%] pt-[10%]'>
        <img src={DefaultLogo} alt='로고' className='w-[410px] h-[165px]' />
        <div className='flex flex-col gap-[20px]'>
          <LoginButton
            iconType='github'
            label='Github로 시작하기'
            onClick={handleGoogleLogin}
          />
          <LoginButton iconType='google' label='Google 시작하기' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
