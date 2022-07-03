import Button from './formsControls/Button';
import DeleteUserForm from './DeleteUserForm';
import UserDataForm from './UserDataForm';
import style from './FormContainer.module.css';
import BUTTON_TYPE from '../constants/buttonType';
import { useContext } from 'react';
import FormsContext from '../contexts/FormsContext';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';

const FormContainer = ({ showForm }) => {
  const { setCancelForm } = useContext(FormsContext);

  if (showForm === SHOW_FORMS_VALUES.usersFilters) return null;
  return (
    <div className={style.formContainer}>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={setCancelForm}>
        X
      </Button>

      {showForm === SHOW_FORMS_VALUES.userDataForm && <UserDataForm />}
      {showForm === SHOW_FORMS_VALUES.userDeleteForm && <DeleteUserForm />}
    </div>
  );
};

export default FormContainer;
