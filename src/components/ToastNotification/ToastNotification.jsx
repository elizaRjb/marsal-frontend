import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

const ToastNotification = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      transition={Slide}
    />
  );
};

export default ToastNotification;
