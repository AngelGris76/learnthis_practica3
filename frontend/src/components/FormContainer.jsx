import Button from './Button';
import DeleteUserForm from './DeleteUserForm';
import UserDataForm from './UserDataForm';
import style from './FormContainer.module.css';
import BUTTON_TYPE from '../constants/buttonType';
import { useContext } from 'react';
import FormsContext from '../contexts/FormsContext';

const FormContainer = ({ showUserDataForm, showDeleteForm }) => {
  const { setCancelForm } = useContext(FormsContext);

  const showForm = showUserDataForm || showDeleteForm;

  if (!showForm) return null;
  return (
    <div className={style.formContainer}>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={setCancelForm}>
        X
      </Button>

      {showUserDataForm && <UserDataForm />}
      {showDeleteForm && <DeleteUserForm />}
    </div>
  );
};

export default FormContainer;
