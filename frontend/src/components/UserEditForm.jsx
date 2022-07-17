import { useContext, useState } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import ROLE_OPTIONS from '../constants/roleOptions';
import FormsContext from '../contexts/FormsContext';
import useEditFormValues from '../hooks/useEditFormValues';
import updateUserById from '../libs/api/updateUserById';
import Button from './formsControls/Button';
import CheckBox from './formsControls/CheckBox';
import InputSelect from './formsControls/InputSelect';
import InputText from './formsControls/InputText';
import InputTextValidatable from './formsControls/InputTextValidatable';

import style from './UserEditForm.module.css';

const UserEditForm = ({ currentUser }) => {
  const { setLoading, setShowFilters } = useContext(FormsContext);
  const [updating, setUpdating] = useState(false);

  const {
    name,
    userName,
    active,
    role,
    validating,
    disabled,
    dispatchFormValues,
  } = useEditFormValues(currentUser);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(
          currentUser.id,
          name,
          userName,
          role,
          active,
          setLoading,
          setUpdating,
          setShowFilters
        );
      }}
    >
      <div className={style.inputs}>
        <InputText
          label='Nombre'
          value={name.value}
          changeHandler={(newName) => {
            dispatchFormValues({ type: 'name_changed', value: newName });
          }}
          error={name.error}
        />
        <InputTextValidatable
          label='UserName'
          value={userName.value}
          changeHandler={(newUserName) => {
            dispatchFormValues({
              type: 'userName_changed',
              value: newUserName,
            });
          }}
          error={userName.error}
          isValidating={validating}
        />
      </div>
      <div className={style.controls}>
        <InputSelect
          options={ROLE_OPTIONS}
          value={role}
          setter={(newRoleValue) => {
            dispatchFormValues({ type: 'role_changed', value: newRoleValue });
          }}
        />
        <CheckBox
          label='¿Activo?'
          value={active}
          setter={(newActive) => {
            dispatchFormValues({ type: 'isActive_changed', value: newActive });
          }}
        />
        <Button type={BUTTON_TYPE.primarySubmit} disabled={disabled}>
          {!updating ? 'Editar Usuario' : 'Actualizando'}
        </Button>
      </div>
    </form>
  );
};

export default UserEditForm;

const onSubmit = async (
  id,
  name,
  userName,
  role,
  active,
  setLoading,
  setUpdating,
  setShowFilters
) => {
  const updateData = {
    name: name.value,
    userName: userName.value,
    role,
    isActive: active,
  };

  setUpdating(true);
  updateUser(id, updateData, setLoading, setShowFilters);
};

const updateUser = async (id, updateData, setLoading, setShowFilters) => {
  await updateUserById(id, updateData);

  setLoading();
  setShowFilters();
};
