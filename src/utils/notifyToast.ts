import { toast } from 'react-toastify';
const notifyToast = (message: string) =>
  toast(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
  });
export default notifyToast;
