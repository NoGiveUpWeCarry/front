import { ToastContainer, toast } from 'react-toastify';
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';

interface ToastProp {
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}

const iconMap = {
  info: <Info className='stroke-indigo-400' />,
  error: <CircleAlert className='stroke-red-500' />,
  success: <BadgeCheck className='stroke-green-500' />,
  warning: <TriangleAlert className='stroke-yellow-500' />,
};

const Toast = ({ type, message }: ToastProp) => {
  const showToast = () => {
    toast(message, {
      icon: () => iconMap[type] || null,
    });
  };

  showToast();
  return <ToastContainer />;
};

export default Toast;
