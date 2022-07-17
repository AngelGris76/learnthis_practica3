import { useEffect, useReducer } from 'react';
import findUserByUserName from '../libs/api/findUserByUserName';
import editFormReducer from '../reducers/editFormsReducer';

const asyncValidate = async (userName, oldId, dispatchFormValues) => {
  const user = await findUserByUserName(userName);

  let errorValue = false;
  if (user && user.id !== oldId) {
    errorValue = 'Invalid UserName';
  }
  dispatchFormValues({ type: 'userName_async_error', value: errorValue });
};

const useEditFormValues = (currentUser) => {
  const [formValues, dispatchFormValues] = useReducer(editFormReducer, {
    id: currentUser.id,
    name: { value: currentUser.name, error: false },
    userName: { value: currentUser.userName, error: false },
    active: currentUser.isActive,
    role: currentUser.role,
  });

  useEffect(() => {
    if (formValues.id !== currentUser.id) {
      dispatchFormValues({ type: 'user_changed', value: currentUser });
    }
  }, [formValues, currentUser]);

  useEffect(() => {
    if (formValues.userName.value !== '' && formValues.validating) {
      const timeOut = setTimeout(() => {
        asyncValidate(
          formValues.userName.value,
          currentUser.id,
          dispatchFormValues
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

  return { ...formValues, disabled, dispatchFormValues };
};

export default useEditFormValues;
