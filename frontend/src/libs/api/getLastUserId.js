const API_URL = import.meta.env.VITE_API_URL;

const getLastUserId = async () => {
  try {
    const response = await fetch(`${API_URL}?_sort=id&_order=desc`);

    if (!response.ok) {
      return 0;
    }

    const totalUsers = await response.json();

    if (!totalUsers.length) {
      return 0;
    }

    return totalUsers[0].id;
  } catch (err) {
    return err;
  }
};

export default getLastUserId;
