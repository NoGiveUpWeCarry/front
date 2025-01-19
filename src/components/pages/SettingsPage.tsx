import SettingsTemplate from '@/components/templates/SettingsTemplate';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

const SettingsPage = () => {
  const { isLoggedIn } = useAuthStore.getState();

  useEffect(() => {
    if (!isLoggedIn) window.location.href = '/login';
  }, [isLoggedIn]);

  return <SettingsTemplate />;
};

export default SettingsPage;
