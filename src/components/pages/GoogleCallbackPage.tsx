import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      axios
        .post('http://localhost:8080/auth/google/callback', {
          code: authorizationCode,
        })
        .then((response) => {
          const { accessToken, user } = response.data;
          localStorage.setItem('auth_token', accessToken); // JWT 토큰 저장
          console.log('로그인 성공:', user); // 사용자 정보 출력
          navigate('/'); // 메인 페이지로 리디렉션
        })
        .catch((error) => {
          console.error('Authorization Code 전송 중 오류:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        });
    }
  }, [navigate]);

  return (
    <div>
      <p>Google 로그인 중...</p>
    </div>
  );
};

export default GoogleCallbackPage;
