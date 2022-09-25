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
import useCreateFormValues from '../hooks/useCreateFormValues';
import createUser from '../libs/api/createUser';
import getLastUserId from '../libs/api/getLastUserId';
import Button from './formsControls/Button';
import CheckBox from './formsControls/CheckBox';
import InputSelect from './formsControls/InputSelect';
import InputText from './formsControls/InputText';
import InputTextValidatable from './formsControls/InputTextValidatable';

import style from './UserCreateForm.module.css';

const UserCreateForm = ({ cancelForms }) => {
  const { setLoading } = useContext(FormsContext);
  const [creating, setCreating] = useState(false);
  const {
    name,
    userName,
    active,
    role,
    validating,
    disabled,
    createFormDispatch,
  } = useCreateFormValues();

  return (
    <form
      className={style.createFormContainer}
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(
          name,
          userName,
          role,
          active,
          setLoading,
          setCreating,
          cancelForms
        );
      }}
    >
      <InputText
        label='Nombre'
        value={name.value}
        changeHandler={(newName) => {
          createFormDispatch(nameChanged(newName));
        }}
        error={name.error}
      />
      <InputTextValidatable
        label='UserName'
        value={userName.value}
        changeHandler={(newUserName) => {
          createFormDispatch(userNameChanged(newUserName));
        }}
        error={userName.error}
        isValidating={validating}
      />
      <InputSelect
        options={ROLE_OPTIONS}
        value={role}
        setter={(newRole) => {
          createFormDispatch(roleChanged(newRole));
        }}
      />
      <CheckBox
        label='¿Activo?'
        value={active}
        setter={(activeValue) => {
          createFormDispatch(isActiveChanged(activeValue));
        }}
      />
      <Button type={BUTTON_TYPE.primarySubmit} disabled={disabled}>
        {!creating ? 'Añadir usuario' : 'Grabando'}
      </Button>
    </form>
  );
};

export default UserCreateForm;

const onSubmit = async (
  name,
  userName,
  role,
  active,
  setLoading,
  setCreating,
  cancelForms
) => {
  const newUser = {
    name: name.value,
    userName: userName.value,
    role,
    isActive: active,
  };

  setCreating(true);
  create(newUser, setLoading, cancelForms);
};

const create = async (newUser, setLoading, cancelForms) => {
  const lastId = await getLastUserId();
  const newId = lastId + 1;
  const user = { ...newUser, id: newId };
  await createUser(user);
  setLoading();
  cancelForms();
};
