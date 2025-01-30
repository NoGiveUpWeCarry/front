import { ToastContainer, toast } from 'react-toastify';
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';

interface ToastProp {
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}

const Toast = ({ type, message }: ToastProp) => {
  const showToast = () => {
    toast(message, {
      icon: () => {
        switch (type) {
          case 'info':
            return <Info className='stroke-indigo-400' />;
          case 'error':
            return <CircleAlert className='stroke-red-500' />;
          case 'success':
            return <BadgeCheck className='stroke-green-500' />;
          case 'warning':
            return <TriangleAlert className='stroke-yellow-500' />;
          default:
            return null;
        }
      },
    });
  };
  showToast();
  return <ToastContainer />;
};

export default Toast;
