import { useContext, useState } from 'react';
import {
  isActiveChanged,
  nameChanged,
  roleChanged,
  userNameChanged,
} from '../actions/userFormActionsBuilder';
import BUTTON_TYPE from '../constants/buttonType';
import ROLE_OPTIONS from '../constants/roleOptions';
import FormsContext from '../contexts/FormsContext';
import useEditFormValues from '../hooks/useEditFormValues';
import { dispatchErrorAlert, dispatchSuccesAlert } from '../libs/alertEvent';
import updateUserById from '../libs/api/updateUserById';
import Button from './formsControls/Button';
import CheckBox from './formsControls/CheckBox';
import InputSelect from './formsControls/InputSelect';
import InputText from './formsControls/InputText';
import InputTextValidatable from './formsControls/InputTextValidatable';

import style from './UserEditForm.module.css';

const UserEditForm = ({ currentUser, cancelForms }) => {
  const { setLoading } = useContext(FormsContext);
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
      className={style.editFormContainer}
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
          cancelForms
        );
      }}
    >
      <InputText
        label='Nombre'
        value={name.value}
        changeHandler={(newName) => {
          dispatchFormValues(nameChanged(newName));
        }}
        error={name.error}
      />
      <InputTextValidatable
        label='UserName'
        value={userName.value}
        changeHandler={(newUserName) => {
          dispatchFormValues(userNameChanged(newUserName));
        }}
        error={userName.error}
        isValidating={validating}
      />
      <InputSelect
        options={ROLE_OPTIONS}
        value={role}
        setter={(newRoleValue) => {
          dispatchFormValues(roleChanged(newRoleValue));
        }}
      />
      <CheckBox
        label='¿Activo?'
        value={active}
        setter={(newActive) => {
          dispatchFormValues(isActiveChanged(newActive));
        }}
      />
      <Button type={BUTTON_TYPE.primarySubmit} disabled={disabled}>
        {!updating ? 'Editar Usuario' : 'Actualizando'}
      </Button>
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
  cancelForms
) => {
  const updateData = {
    name: name.value,
    userName: userName.value,
    role,
    isActive: active,
  };

  setUpdating(true);
  updateUser(id, updateData, setLoading, cancelForms);
};

const updateUser = async (id, updateData, setLoading, cancelForms) => {
  const { error } = await updateUserById(id, updateData);

  if (error) dispatchErrorAlert('Error al modificar usuario');
  else {
    dispatchSuccesAlert('Usuario modificado con exito');
    setLoading();
  }

  cancelForms();
};
