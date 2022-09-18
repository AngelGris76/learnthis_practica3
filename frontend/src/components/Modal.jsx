import { createPortal } from 'react-dom';
import BUTTON_TYPE from '../constants/buttonType';
import Button from './formsControls/Button';

import style from './Modal.module.css';

const Modal = ({ cancel, children }) => {
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
