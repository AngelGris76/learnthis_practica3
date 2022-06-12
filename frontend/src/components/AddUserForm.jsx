import BUTTON_TYPE from '../constants/buttonType';
import Button from './Button';
import InputText from './InputText';
import style from './AddUserForm.module.css';
import useUserForm from '../hooks/useUserForm';
import validateName from '../libs/validateName';
import InputSelect from './InputSelect';
import CheckBox from './CheckBox';
import ROLE_OPTIONS from '../constants/roleOptions';
import InputTextValidatable from './InputTextValidatable';

const AddUserForm = ({ cancelClick }) => {
  const {
    nameError,
    userNameError,
    isValidating,
    name,
    userName,
    role,
    isActive,
    setNameError,
    setUserNameError,
    setValidating,
    setName,
    setUserName,
    setRole,
    setActive,
  } = useUserForm();

  const addUser = (ev) => {
    ev.preventDefault();
  };

  const anyError = nameError || userNameError || isValidating;

  return (
    <form className={style.formContainer} onSubmit={addUser}>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={cancelClick}>
        X
      </Button>
      <div className={style.inputs}>
        <InputText
          label={'nombre'}
          value={name}
          error={nameError}
          changeHandler={(newValue) => {
            setName(newValue);
          }}
          validateHandler={(newNameValue) => {
            const isValidName = validateName(newNameValue);
            setNameError(!isValidName);
          }}
        />
        <InputTextValidatable
          label={'UserName'}
          value={userName}
          error={userNameError}
          isValidating={isValidating}
          changeHandler={(newValue) => {
            setUserName(newValue);
          }}
          validateHandler={(newValue) => {
            if (newValue === 'validating') {
              setValidating(true);
              return;
            }
            setUserNameError(newValue);
          }}
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
        <CheckBox label={'¿Activo?'} value={isActive} setter={setActive} />
        <Button
          type={BUTTON_TYPE.primary}
          disabled={anyError}
          clickHandler={addUser}
        >
          Añadir usuario
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
