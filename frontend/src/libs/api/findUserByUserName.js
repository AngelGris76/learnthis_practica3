const findUserByUserName = async (userName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('sebastian');
    }, 5000);
  });
};

export default findUserByUserName;
