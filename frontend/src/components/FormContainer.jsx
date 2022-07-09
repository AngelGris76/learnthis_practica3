import { useContext } from 'react';
import Button from './formsControls/Button';
import UserDeleteForm from './UserDeleteForm';
import UserCreateForm from './UserCreateForm';
import UserEditForm from './UserEditForm';
import BUTTON_TYPE from '../constants/buttonType';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';
import FormsContext from '../contexts/FormsContext';
import style from './FormContainer.module.css';

const FormContainer = ({ showForm }) => {
  const { currentUser, setCancelForm } = useContext(FormsContext);

  if (showForm === SHOW_FORMS_VALUES.usersFilters) return null;
  return (
    <div className={style.formContainer}>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={setCancelForm}>
        X
      </Button>
      {showForm === SHOW_FORMS_VALUES.userCreateForm && <UserCreateForm />}
      {showForm === SHOW_FORMS_VALUES.userEditForm && (
        <UserEditForm currentUser={currentUser} />
      )}
      {showForm === SHOW_FORMS_VALUES.userDeleteForm && <UserDeleteForm />}
    </div>
  );
};

export default FormContainer;
