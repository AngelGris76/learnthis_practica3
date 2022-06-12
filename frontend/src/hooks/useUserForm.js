import { useEffect, useState } from 'react';
import INITIAL_ERROR_VALUES from '../constants/initialErrorValues';
import INITIAL_USER_DATA from '../constants/initialUserData';
import findUserById from '../libs/api/findUserById';

const getUserDataById = async (id) => {
  try {
    return await findUserById(id);
  } catch (err) {}
};

const useUserForm = (id) => {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [error, setError] = useState(INITIAL_ERROR_VALUES);
  const [isValidating, setValidating] = useState('initial');

  const setName = (newValue) => {
    const newUserData = { ...userData, name: newValue };
    setUserData(newUserData);
  };

  const setUserName = (newValue) => {
    const newUserData = { ...userData, userName: newValue };
    setUserData(newUserData);
  };

  const setActive = (newValue) => {
    const newUserData = { ...userData, isActive: newValue };
    setUserData(newUserData);
  };

  const setRole = (newValue) => {
    const newUserData = { ...userData, role: newValue };
    setUserData(newUserData);
  };

  const setNameError = (newValue) => {
    const newError = { ...error, nameError: newValue };
    setValidating(false);
    setError(newError);
  };

  const setUserNameError = (newValue) => {
    const newError = { ...error, userNameError: newValue };
    setValidating(false);
    setError(newError);
  };

  const setAllError = (nameError, userNameError) => {
    setError({ nameError, userNameError });
  };

  useEffect(() => {
    if (id) {
      getUserDataById(id);
    }
  }, [id, setUserData]);

  return {
    ...userData,
    ...error,
    isValidating,
    setUserData,
    setNameError,
    setUserNameError,
    setAllError,
    setValidating,
    setName,
    setUserName,
    setActive,
    setRole,
  };
};

export default useUserForm;
