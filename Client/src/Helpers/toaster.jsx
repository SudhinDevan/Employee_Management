import { toast } from 'react-toastify';
export const showToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

 export const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
    });
}
