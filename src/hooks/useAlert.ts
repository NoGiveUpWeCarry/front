import { useNavigate } from 'react-router-dom';

export const useAlert = () => {
  const navigate = useNavigate();

  const loginAlert = () => {
    alert('로그인을 해주세요');
    navigate('/login');
  };

  const selectChannelAlert = () => {
    alert('채널을 선택해주세요');
  };

  return { loginAlert, selectChannelAlert };
};
