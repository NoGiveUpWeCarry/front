import SettingsTemplate from '@/components/templates/SettingsTemplate';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { isLoggedIn } = useAuthStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  return <SettingsTemplate />;
};

export default SettingsPage;
