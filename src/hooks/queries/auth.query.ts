import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postGoogleAuth, GoogleAuthResponse } from '@/apis/auth';
import useAuth from '@/store/useAuth';

export const useGoogleAuth = (): UseMutationResult<
  GoogleAuthResponse,
  unknown,
  string
> => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation(postGoogleAuth, {
    onSuccess: (data) => {
      const { accessToken, user, isExistingUser } = data;
      login(user, accessToken);
      console.log('로그인 성공:', user);
      if (isExistingUser) {
        navigate('/roleselect');
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      console.error('Authorization Code 전송 중 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
    },
  });
};
