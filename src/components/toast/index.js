import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message, type) => {
  const option = {
    autoClose: 3000,
  };
  if (type === 'error') {
    toast.error(message, option);
    return;
  }
  if (type === 'success') {
    toast.success(message, option);
    return;
  }
  toast(message, option);
};
export { ToastContainer, notify };
