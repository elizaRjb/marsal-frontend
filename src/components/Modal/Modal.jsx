import React from 'react';
import ReactModal from 'react-modal';

import { CLOSE } from 'utils/images';

import Button from 'components/Button/Button';

ReactModal.setAppElement('#root');

const Modal = props => {
  const { children, showModal, onCloseModal, className } = props;

  let modalClassName = 'modal__content ';

  if (className) {
    modalClassName += className;
  }

  return (
    <ReactModal isOpen={showModal} className={modalClassName} overlayClassName="modal">
      <Button className="modal__close-btn" onClick={onCloseModal} title="CLose">
        <img src={CLOSE} alt="Close" />
      </Button>
      {children}
    </ReactModal>
  );
};

export default Modal;
