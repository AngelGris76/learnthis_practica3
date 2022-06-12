const USER_NAME_REGEX = /^[^\d][a-z\d]{5,14}$/;

const validateUserName = (userName) => {
  return USER_NAME_REGEX.test(userName);
};

export default validateUserName;
