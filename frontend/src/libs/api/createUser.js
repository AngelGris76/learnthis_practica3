const API_URL = import.meta.env.VITE_API_URL;

const createUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('No se pudo crear el usuario');
    }
  } catch (err) {
    return err;
  }
};

export default createUser;
