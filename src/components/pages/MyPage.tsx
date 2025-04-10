import MyPageTemplate from '@/components/templates/MyPage/MyPageTemplate';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { isLoggedIn } = useAuthStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  return <MyPageTemplate />;
};

export default MyPage;
