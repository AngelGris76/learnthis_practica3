import { useContext, useState } from 'react';
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

const UserCreateForm = () => {
  const { setLoading, setCancelForm } = useContext(FormsContext);
  const [creating, setCreating] = useState(false);
  const {
    name,
    userName,
    active,
    role,
    validating,
    disabled,
    setName,
    setUserName,
    setActive,
    setRole,
  } = useCreateFormValues();

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(
          name,
          userName,
          role,
          active,
          setLoading,
          setCreating,
          setCancelForm
        );
      }}
    >
      <div className={style.inputs}>
        <InputText
          label='Nombre'
          value={name.value}
          changeHandler={setName}
          error={name.error}
        />
        <InputTextValidatable
          label='UserName'
          value={userName.value}
          changeHandler={setUserName}
          error={userName.error}
          isValidating={validating}
        />
      </div>
      <div className={style.controls}>
        <InputSelect
          options={ROLE_OPTIONS}
          value={role}
          setter={(newValue) => {
            setRole(newValue);
          }}
        />
        <CheckBox label='¿Activo?' value={active} setter={setActive} />
        <Button type={BUTTON_TYPE.primarySubmit} disabled={disabled}>
          {!creating ? 'Añadir usuario' : 'Grabando'}
        </Button>
      </div>
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
  setCancelForm
) => {
  const newUser = {
    name: name.value,
    userName: userName.value,
    role,
    isActive: active,
  };

  setCreating(true);
  create(newUser, setLoading, setCancelForm);
};

const create = async (newUser, setLoading, setCancelForm) => {
  const lastId = await getLastUserId();
  const newId = lastId + 1;
  const user = { ...newUser, id: newId };
  await createUser(user);
  setLoading();
  setCancelForm();
};
