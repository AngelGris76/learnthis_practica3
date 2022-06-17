const findUserByUserName = async (userName) => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}?userName=${userName}`);
    if (!response.ok) {
      throw new Error('Respuesta no ok');
    }
    const userData = await response.json();

    if (!userData) {
      return;
    }

    return userData[0];
  } catch (err) {
    return err;
  }
};

export default findUserByUserName;
