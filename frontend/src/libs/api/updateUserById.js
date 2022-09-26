const API_URL = import.meta.env.VITE_API_URL;

const updateUserById = async (id, newData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return { error: true };
  }
};

export default updateUserById;
