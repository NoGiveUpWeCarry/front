import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuthorizationCode, fetchUserRole } from '@/apis/auth';
import useAuthStore from '@/store/authStore';
import { AuthResponse } from '@/types/auth.type';
import { RoleResponse } from '@/types/role.type';
// import useAuth from '@/store/useAuth.store';

export const useAuthMutation = (): UseMutationResult<
  AuthResponse,
  unknown,
  { authorizationCode: string; provider: string }
> => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  return useMutation(
    ({ authorizationCode, provider }) =>
      postAuthorizationCode({ authorizationCode, provider }),
    {
      onSuccess: (data) => {
        const { accessToken, user, isExistingUser, message } = data;
        login(user, accessToken);
        if (isExistingUser) {
          navigate('/');
        } else {
          navigate('/roleselect');
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
  const { setUserRole } = useAuthStore();
  return useMutation(({ userRole }) => fetchUserRole({ userRole }), {
    onSuccess: (data) => {
      const { user } = data;
      setUserRole(user.role_id);
    },
    onError: (error) => {
      console.error('롤 변경 중 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
