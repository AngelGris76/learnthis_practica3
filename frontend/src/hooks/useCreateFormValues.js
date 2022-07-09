import { useEffect, useState } from 'react';
import ROLE_OPTIONS from '../constants/roleOptions';
import findUserByUserName from '../libs/api/findUserByUserName';
import validateName from '../libs/validateName';
import validateUserName from '../libs/validateUserName';

const asyncValidate = async (userName, setUserNameError, setValidating) => {
  const user = await findUserByUserName(userName);

  if (user) {
    setUserNameError('usuario invalido');
  }
  setValidating(false);
};

const useCreateFormValues = () => {
  const [formValues, setFormValues] = useState({
    name: { value: '', error: undefined },
    userName: { value: '', error: undefined },
    role: ROLE_OPTIONS.TEACHER.value,
    active: false,
    validating: undefined,
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
    if (formValues.userName.value !== '' && formValues.validating) {
      const timeOut = setTimeout(() => {
        asyncValidate(
          formValues.userName.value,
          setUserNameError,
          setValidating
        );
      }, 300);
      return () => clearTimeout(timeOut);
    }
  }, [formValues.userName.value, formValues.validating]);

  const disabled =
    formValues.name.error !== false ||
    formValues.userName.error !== false ||
    formValues.validating;

  return { ...formValues, disabled, setRole, setActive, setName, setUserName };
};

export default useCreateFormValues;
