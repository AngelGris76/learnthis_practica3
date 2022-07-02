const getAllUser = async (signal) => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(API_URL, { signal });
    if (!response.ok) {
      throw new Error('Error al cargar los datos');
    }

    const data = await response.json();

    return { error: null, users: data };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { error: null, users: [] };
    }

    return { error: err.message, users: null };
  }
};

export default getAllUser;
