const NAME_REGEX = /^([^ _-]+-?_?[^ _-]+ ?)+$/i;

const validateName = (name) => {
  if (name.length < 2 || name.length > 30) {
    return 'Debe tener entre 2 y 30 caracteres';
  }

  if (!NAME_REGEX.test(name)) {
    return 'Error de formato';
  }

  return false;
};

export default validateName;
