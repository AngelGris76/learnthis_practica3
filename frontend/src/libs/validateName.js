const NAME_REGEX = /^([^ _-]+-?_?[^ _-]+ ?)+$/gi;

const validateName = (name) => {
  if (name.length < 2 || name.length > 30) {
    return false;
  }
  return NAME_REGEX.test(name);
};

export default validateName;
