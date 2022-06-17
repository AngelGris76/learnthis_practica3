import VALIDATE_VALUES from '../constants/validateValues';
import findUserByUserName from './api/findUserByUserName';
import validateUserName from './validateUserName';

const validateNewUserName = async (id, newUserName, errorSetter) => {
  try {
    const isValidUserName = validateUserName(newUserName);

    if (isValidUserName === VALIDATE_VALUES.fail) {
      errorSetter(isValidUserName);
      return;
    }

    const userData = await findUserByUserName(newUserName);

    if (userData && userData.id !== id) {
      errorSetter(VALIDATE_VALUES.fail);
      return;
    }

    errorSetter(VALIDATE_VALUES.pass);
  } catch (err) {
    return err;
  }
};

export default validateNewUserName;
