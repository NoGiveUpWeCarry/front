import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory -> useNavigate로 변경
import LoginButton from '@/components/atoms/LoginButton';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';
import axios from 'axios'; // axios import

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // Google OAuth 로그인 페이지로 리다이렉트
    window.location.href = 'http://localhost:8080/auth/google';
  };

  const handleGitHubLogin = () => {
    // GitHub OAuth 로그인 페이지로 리다이렉트
    window.location.href = 'http://localhost:8080/auth/github';
  };

  return (
    <div className='flex justify-center w-full min-h-svh'>
      <div className='w-[700px] min-h-full flex flex-col items-center gap-[20%] pt-[10%]'>
        <img src={DefaultLogo} alt='로고' className='w-[410px] h-[165px]' />
        <div className='flex flex-col gap-[20px]'>
          <LoginButton iconType='github' label='Github로 시작하기' />
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
