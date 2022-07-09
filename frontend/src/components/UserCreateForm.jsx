import BUTTON_TYPE from '../constants/buttonType';
import ROLE_OPTIONS from '../constants/roleOptions';
import useCreateFormValues from '../hooks/useCreateFormValues';
import Button from './formsControls/Button';
import CheckBox from './formsControls/CheckBox';
import InputSelect from './formsControls/InputSelect';
import InputText from './formsControls/InputText';
import InputTextValidatable from './formsControls/InputTextValidatable';

import style from './UserCreateForm.module.css';

const UserCreateForm = () => {
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
    <form>
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
          Añadir usuario
        </Button>
      </div>
    </form>
  );
};

export default UserCreateForm;
