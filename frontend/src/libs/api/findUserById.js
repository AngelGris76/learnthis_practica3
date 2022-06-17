const findUserById = async (id) => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      return;
    }

    const userData = response.json();
    return userData;
  } catch (err) {
    return err;
  }
};

export default findUserById;
