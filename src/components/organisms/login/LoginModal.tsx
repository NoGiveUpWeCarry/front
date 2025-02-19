import ReactDOM from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import LoginButton from '@/components/atoms/LoginButton';
import DefaultLogo from '@/assets/logos/DefaultLogo.svg';
import { useAuthMutation } from '@/hooks/queries/auth.query';

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const authMutation = useAuthMutation();
  const [popUp, setPopUp] = useState<Window | null>(null);

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    const oauthUrl = `${import.meta.env.VITE_BASE_SERVER_URL}/auth/${provider}`;
    const width = 500;
    const height = 600;
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;
    const newPopUp = window.open(
      oauthUrl,
      `${provider}-login`,
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
    );

    if (!newPopUp) {
      alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    setPopUp(newPopUp);
  };

  const closePopUp = useCallback(() => {
    if (popUp) popUp.close();
  }, [popUp]);

  // 팝업창에서 로그인 성공 시 실행
  useEffect(() => {
    if (!window.opener) return;
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get('code');
    if (authorizationCode) {
      window.opener.postMessage(
        {
          authorizationCode,
          provider: window.name.replace('-login', ''),
        },
        '*' // 특정 도메인이 아니라 모든 도메인에서 받을 수 있도록 설정 (필요 시 특정 도메인으로 제한)
      );
      setTimeout(() => window.close(), 500); // 팝업이 너무 빨리 닫히지 않도록 약간의 딜레이 추가
    }
  }, []);

  // 부모창에서 OAuth 코드 수신
  useEffect(() => {
    if (window.opener) return;

    const oAuthCodeListener = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;
      const { authorizationCode, provider } = event.data;
      if (authorizationCode && provider) {
        authMutation.mutate(
          { authorizationCode, provider },
          {
            onSuccess: () => {
              setTimeout(() => closePopUp(), 500); // 성공 시 팝업 닫기
            },
          }
        );
      }
    };

    window.addEventListener('message', oAuthCodeListener, false);
    return () => {
      window.removeEventListener('message', oAuthCodeListener);
    };
  }, [authMutation, closePopUp]);

  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px]'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition'
        >
          ✖
        </button>
        <div className='flex flex-col items-center gap-6'>
          <img src={DefaultLogo} alt='로고' className='w-[250px] h-auto' />
          <div className='flex flex-col gap-4 w-full'>
            <LoginButton
              iconType='github'
              label='Github로 시작하기'
              onClick={() => handleOAuthLogin('github')}
            />
            <LoginButton
              iconType='google'
              label='Google 시작하기'
              onClick={() => handleOAuthLogin('google')}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
