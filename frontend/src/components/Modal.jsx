import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import BUTTON_TYPE from '../constants/buttonType';
import Button from './formsControls/Button';

import style from './Modal.module.css';

const Modal = ({ cancel, children }) => {
  useEffect(() => {
    if (!children) return;
    document.body.classList.add(style.noOverFlow);
    return () => {
      document.body.classList.remove(style.noOverFlow);
    };
  }, [children]);

  if (!children) return null;
  return createPortal(
    <div className={style.overlay}>
      <div className={style.formContainer}>
        <Button type={BUTTON_TYPE.iconCancel} clickHandler={cancel}>
          X
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
