import { useEffect } from 'react';
import { useGoogleAuth } from '@/hooks/queries/auth.query';

const GoogleCallbackPage = () => {
  const mutation = useGoogleAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    if (authorizationCode) {
      mutation.mutate(authorizationCode);
    }
  }, [mutation]);

  return (
    <div>
      {mutation.isLoading ? (
        <p>로그인 처리 중...</p>
      ) : (
        <p>Google 로그인 중...</p>
      )}
    </div>
  );
};

export default GoogleCallbackPage;
