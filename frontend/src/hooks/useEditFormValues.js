import { useEffect, useState } from 'react';
import findUserByUserName from '../libs/api/findUserByUserName';
import validateName from '../libs/validateName';
import validateUserName from '../libs/validateUserName';

const asyncValidate = async (
  userName,
  oldId,
  setUserNameError,
  setValidating
) => {
  const user = await findUserByUserName(userName);

  if (user && user.id !== oldId) {
    setUserNameError('usuario invalido');
  }
  setValidating(false);
};

const useEditFormValues = (currentUser) => {
  const [formValues, setFormValues] = useState({
    id: currentUser.id,
    name: { value: currentUser.name, error: false },
    userName: { value: currentUser.userName, error: false },
    active: currentUser.isActive,
    role: currentUser.role,
  });

  const setRole = (newRole) => {
    setFormValues({ ...formValues, role: newRole });
  };

  const setActive = (newActive) => {
    setFormValues({ ...formValues, active: newActive });
  };

  const setName = (newName) => {
    const error = validateName(newName);
    setFormValues({ ...formValues, name: { value: newName, error } });
  };

  const setUserName = (newUserName) => {
    const error = validateUserName(newUserName);
    const newValidating = !error;
    setFormValues({
      ...formValues,
      validating: newValidating,
      userName: { value: newUserName, error },
    });
  };

  const setUserNameError = (newError) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      userName: { error: newError },
    }));
  };

  const setValidating = (validatingValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      validating: validatingValue,
    }));
  };

  useEffect(() => {
    if (formValues.id !== currentUser.id) {
      setFormValues({
        id: currentUser.id,
        name: { value: currentUser.name, error: false },
        userName: { value: currentUser.userName, error: false },
        role: currentUser.role,
        active: currentUser.isActive,
      });
    }
  }, [formValues, currentUser]);

  useEffect(() => {
    if (formValues.userName.value !== '' && formValues.validating) {
      const timeOut = setTimeout(() => {
        asyncValidate(
          formValues.userName.value,
          currentUser.id,
          setUserNameError,
          setValidating
        );
      }, 300);
      return () => clearTimeout(timeOut);
    }
  }, [formValues.userName.value, formValues.validating, currentUser.id]);

  const disabled =
    formValues.name.error !== false ||
    formValues.userName.error !== false ||
    formValues.validating ||
    (formValues.name.value === currentUser.name &&
      formValues.userName.value === currentUser.userName &&
      formValues.role === currentUser.role &&
      formValues.active === currentUser.isActive);

  return { ...formValues, disabled, setRole, setActive, setName, setUserName };
};

export default useEditFormValues;
