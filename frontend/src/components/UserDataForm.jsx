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
import VALIDATE_VALUES from '../constants/validateValues';
import { useContext, useEffect } from 'react';
import validateNewUserName from '../libs/validateNewUserName';
import updateUserById from '../libs/api/updateUserById';
import getLastUserId from '../libs/api/getLastUserId';
import createUser from '../libs/api/createUser';
import FormsContext from '../contexts/FormsContext';

const UserDataForm = () => {
  const { currentUser, setCancelForm, setLoading } = useContext(FormsContext);

  const {
    nameError,
    userNameError,
    isValidating,
    name,
    userName,
    role,
    isActive,
    userNameField,
    setUserNameField,
    setNameError,
    setUserNameError,
    setValidating,
    setName,
    setUserName,
    setRole,
    setActive,
  } = useUserForm(currentUser);

  useEffect(() => {
    let timeOut;
    if (userName !== userNameField) {
      timeOut = setTimeout(() => {
        setUserName(userNameField);
        setValidating(true);
        validateNewUserName(currentUser.id, userNameField, setUserNameError);
      }, 300);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [
    currentUser.id,
    userName,
    userNameField,
    setUserName,
    setValidating,
    setUserNameError,
  ]);

  const addUser = async (ev, newUser) => {
    ev.preventDefault();

    if (newUser.id) {
      await updateUserById(newUser.id, newUser);
    } else {
      const lastId = await getLastUserId();

      newUser.id = lastId + 1;

      await createUser(newUser);
    }

    setLoading();
    setCancelForm();
  };

  const anyError =
    nameError === VALIDATE_VALUES.fail ||
    !name ||
    userNameError === VALIDATE_VALUES.fail ||
    !userName ||
    isValidating === true;

  return (
    <form
      onSubmit={(ev) => {
        const newUser = { id: currentUser.id, name, userName, isActive, role };
        addUser(ev, newUser);
      }}
    >
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
            setNameError(isValidName);
          }}
        />
        <InputTextValidatable
          label={'UserName'}
          value={userNameField}
          error={userNameError}
          isValidating={isValidating}
          changeHandler={(newValue) => {
            setUserNameField(newValue);
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
        <Button type={BUTTON_TYPE.primarySubmit} disabled={anyError}>
          {currentUser && 'Editar usuario'}
          {!currentUser && 'Añadir usuario'}
        </Button>
      </div>
    </form>
  );
};

export default UserDataForm;
