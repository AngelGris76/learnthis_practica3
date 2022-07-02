import { useState } from 'react';
import INITIAL_ERROR_VALUES from '../constants/initialErrorValues';

const useUserForm = (currentUser) => {
  const [userData, setUserData] = useState({
    name: currentUser.name,
    userName: currentUser.userName,
    isActive: currentUser.isActive,
    role: currentUser.role,
  });

  const [error, setError] = useState(INITIAL_ERROR_VALUES);
  const [isValidating, setValidating] = useState('initial');
  const [userNameField, setUserNameField] = useState('');

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

  return {
    ...userData,
    ...error,
    isValidating,
    userNameField,
    setUserNameField,
    setUserData,
    setNameError,
    setUserNameError,
    setValidating,
    setName,
    setUserName,
    setActive,
    setRole,
  };
};

export default useUserForm;
