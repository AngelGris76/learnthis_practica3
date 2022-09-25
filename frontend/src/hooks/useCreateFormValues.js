import { useEffect, useReducer } from 'react';
import { userNameAsyncError } from '../actions/userFormActionsBuilder';
import ROLE_OPTIONS from '../constants/roleOptions';
import findUserByUserName from '../libs/api/findUserByUserName';
import createFormReducer from '../reducers/createFormReducer';

const asyncValidate = async (userName, createFormDispatch) => {
  const user = await findUserByUserName(userName);

  let userNameError = false;
  if (user) {
    userNameError = 'usuario invalido';
  }
  // createFormDispatch({ type: 'userName_async_error', value: userNameError });
  createFormDispatch(userNameAsyncError(userNameError));
};

const useCreateFormValues = () => {
  const [formValues, createFormDispatch] = useReducer(createFormReducer, {
    name: { value: '', error: undefined },
    userName: { value: '', error: undefined },
    role: ROLE_OPTIONS.TEACHER.value,
    active: false,
    validating: undefined,
  });

  useEffect(() => {
    if (formValues.userName.value !== '' && formValues.validating) {
      const timeOut = setTimeout(() => {
        asyncValidate(formValues.userName.value, createFormDispatch);
      }, 300);
      return () => clearTimeout(timeOut);
    }
  }, [formValues.userName.value, formValues.validating]);

  const disabled =
    formValues.name.error !== false ||
    formValues.userName.error !== false ||
    formValues.validating;

  return { ...formValues, disabled, createFormDispatch };
};

export default useCreateFormValues;
