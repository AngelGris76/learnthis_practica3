const USER_NAME_REGEX = /^[^\d][a-z\d]{5,14}$/;

const validateUserName = (userName) => {
  if (userName.length < 6 || userName.length > 15) {
    return 'Debe tener entre 6 y 15 caracteres';
  }

  if (!USER_NAME_REGEX.test(userName)) {
    return 'Error de formato';
  }

  return false;
};

export default validateUserName;
