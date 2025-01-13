import SettingsTemplate from '@/components/templates/SettingsTemplate';
import useAuth from '@/store/useAuth.store';
import { useEffect } from 'react';

const SettingsPage = () => {
  const { isLoggedIn } = useAuth.getState();

  useEffect(() => {
    if (!isLoggedIn) window.location.href = '/login';
  }, [isLoggedIn]);

  return <SettingsTemplate />;
};

export default SettingsPage;
