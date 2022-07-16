import { useContext } from 'react';
import Button from './formsControls/Button';
import UserDeleteForm from './UserDeleteForm';
import UserCreateForm from './UserCreateForm';
import UserEditForm from './UserEditForm';
import BUTTON_TYPE from '../constants/buttonType';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';
import FormsContext from '../contexts/FormsContext';
import style from './FormContainer.module.css';

const FormContainer = ({ showForm, currentUser }) => {
  const { setShowFilters } = useContext(FormsContext);

  if (showForm === SHOW_FORMS_VALUES.usersFilters) return null;
  return (
    <div className={style.formContainer}>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={setShowFilters}>
        X
      </Button>
      {showForm === SHOW_FORMS_VALUES.userCreateForm && <UserCreateForm />}
      {showForm === SHOW_FORMS_VALUES.userEditForm && (
        <UserEditForm currentUser={currentUser} />
      )}
      {showForm === SHOW_FORMS_VALUES.userDeleteForm && (
        <UserDeleteForm currentUser={currentUser} />
      )}
    </div>
  );
};

export default FormContainer;
