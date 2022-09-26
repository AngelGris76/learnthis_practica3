const API_URL = import.meta.env.VITE_API_URL;

const deleteUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('El usuario no existe');
    }
    const data = await response.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};

export default deleteUserById;
