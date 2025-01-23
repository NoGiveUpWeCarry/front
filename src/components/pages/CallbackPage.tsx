import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthMutation } from '@/hooks/queries/auth.query';

const CallbackPage = () => {
  const { provider } = useParams();
  const authMutation = useAuthMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode && provider) {
      authMutation.mutate({ authorizationCode, provider });
    }
  }, []);

  return (
    <div>
      {authMutation.isPending ? (
        <p>로그인 처리 중...</p>
      ) : (
        <p>OAuth 로그인 중...</p>
      )}
    </div>
  );
};

export default CallbackPage;
