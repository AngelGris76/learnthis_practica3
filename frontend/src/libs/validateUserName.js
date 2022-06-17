import VALIDATE_VALUES from '../constants/validateValues';

const USER_NAME_REGEX = /^[^\d][a-z\d]{5,14}$/;

const validateUserName = (userName) => {
  if (!USER_NAME_REGEX.test(userName)) {
    return VALIDATE_VALUES.fail;
  }

  return VALIDATE_VALUES.pass;
};

export default validateUserName;
