import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuthorizationCode, fetchUserRole } from '@/apis/auth';
import useAuthStore from '@/store/authStore';
import { AuthResponse } from '@/types/auth.type';
import { RoleResponse } from '@/types/role.type';

// Auth 관련 Mutation
export const useAuthMutation = (): UseMutationResult<
  AuthResponse,
  unknown,
  { authorizationCode: string; provider: string }
> => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: ({ authorizationCode, provider }) =>
      postAuthorizationCode({ authorizationCode, provider }),
    onSuccess: async (data) => {
      const { accessToken, user, isExistingUser } = data;
      await login(user, accessToken);
      console.log('login zustand Action 성공');
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
  });
};

// Role 변경 Mutation
export const useRoleMutation = (): UseMutationResult<
  RoleResponse,
  unknown,
  { userRole: number }
> => {
  const { setUserRole } = useAuthStore();

  return useMutation({
    mutationFn: ({ userRole }) => fetchUserRole({ userRole }),
    onSuccess: (data) => {
      const { user } = data;
      setUserRole(user.roleId);
    },
    onError: (error) => {
      console.error('롤 변경 중 오류:', error);
      alert('역할 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
