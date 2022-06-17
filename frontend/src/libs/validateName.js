import VALIDATE_VALUES from '../constants/validateValues';

const NAME_REGEX = /^([^ _-]+-?_?[^ _-]+ ?)+$/i;

const validateName = (name) => {
  if (name.length < 2 || name.length > 30) {
    return VALIDATE_VALUES.fail;
  }

  if (!NAME_REGEX.test(name)) {
    return VALIDATE_VALUES.fail;
  }

  return VALIDATE_VALUES.pass;
};

export default validateName;
