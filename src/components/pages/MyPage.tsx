import MyPageTemplate from '@/components/templates/MyPage/MyPageTemplate';
import useAuth from '@/store/useAuth';
import { useEffect } from 'react';

const MyPage = () => {
  const { isLoggedIn } = useAuth.getState();

  useEffect(() => {
    if (!isLoggedIn) window.location.href = '/login';
  }, [isLoggedIn]);

  return <MyPageTemplate />;
};

export default MyPage;
