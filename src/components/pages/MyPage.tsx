import MyPageTemplate from '@/components/templates/MyPage/MyPageTemplate';
import useAuthStore from '@/store/authStore';
// import useAuth from '@/store/useAuth.store';
import { useEffect } from 'react';

const MyPage = () => {
  const { isLoggedIn } = useAuthStore.getState();

  useEffect(() => {
    if (!isLoggedIn) window.location.href = '/login';
  }, [isLoggedIn]);

  return <MyPageTemplate />;
};

export default MyPage;
