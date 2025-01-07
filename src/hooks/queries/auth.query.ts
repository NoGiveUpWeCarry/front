import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuthorizationCode, fetchUserRole } from '@/apis/auth';
import useAuth from '@/store/useAuth';
import { AuthResponse } from '@/types/auth.type';
import { RoleResponse } from '@/types/role.type';

export const useAuthMutation = (): UseMutationResult<
  AuthResponse,
  unknown,
  { authorizationCode: string; provider: string }
> => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation(
    ({ authorizationCode, provider }) =>
      postAuthorizationCode(authorizationCode, provider),
    {
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
        navigate('/login');
      },
    }
  );
};

export const useRoleMutation = (): UseMutationResult<
  RoleResponse,
  unknown,
  { userRole: number }
> => {
  const { setUserRole } = useAuth();
  return useMutation(({ userRole }) => fetchUserRole(userRole), {
    onSuccess: (data) => {
      const { user } = data;
      setUserRole(user.role_id);
      console.log('유저 롤 변경 성공 성공:', user.role_id);
    },
    onError: (error) => {
      console.error('Authorization Code 전송 중 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
