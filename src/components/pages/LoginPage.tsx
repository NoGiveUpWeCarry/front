import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory -> useNavigate로 변경
import LoginButton from '@/components/atoms/LoginButton';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';
import axios from 'axios'; // axios import

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  useEffect(() => {
    // URL에서 Authorization Code 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      // Authorization Code가 존재하면 백엔드에 전달
      axios
        .post('http://localhost:8080/auth/google/callback', {
          code: authorizationCode, // Authorization Code 전달
        })
        .then((response) => {
          // 토큰이나 사용자 정보 처리 후 메인 페이지로 리디렉션
          console.log(response.data); // 예시로 사용자 정보를 로그에 출력
          localStorage.setItem('auth_token', response.data.accessToken); // JWT 토큰 저장
          navigate('/'); // 메인 페이지로 이동
        })
        .catch((error) => {
          console.error('Error sending authorization code:', error);
        });
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google';
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
