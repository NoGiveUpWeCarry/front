import { useAuthMutation } from '@/hooks/queries/auth.query';
import { useEffect } from 'react';

const CallbackPage = () => {
  const authMutation = useAuthMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    const provider = urlParams.get('provider');

    if (authorizationCode && provider) {
      authMutation.mutate({ authorizationCode, provider });
    }
  }, [authMutation]);

  return (
    <div>
      {authMutation.isLoading ? (
        <p>로그인 처리 중...</p>
      ) : (
        <p>OAuth 로그인 중...</p>
      )}
    </div>
  );
};

export default CallbackPage;
