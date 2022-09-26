import { useEffect, useState } from 'react';
import INITIAL_USERS_VALUE from '../constants/initialUsersValue';
import { dispatchErrorAlert } from '../libs/alertEvent';
import getAllUser from '../libs/api/getAllUser';

const getData = async (signal, setUsers, filters) => {
  const { error, users, totalUsers } = await getAllUser(signal, filters);

  if (error) {
    dispatchErrorAlert('Error al cargar usuarios');
    setUsers({ usersData: '', error, isLoading: false, totalUsers: 0 });
    return;
  }

  setUsers({ usersData: users, error: false, isLoading: false, totalUsers });
};

const useUsers = (filters) => {
  const [users, setUsers] = useState(INITIAL_USERS_VALUE);

  const setLoading = () => {
    const newUsers = { ...users, isLoading: true };
    setUsers(newUsers);
  };

  useEffect(() => {
    if (!users.isLoading) {
      return;
    }
    const controller = new AbortController();

    getData(controller.signal, setUsers, filters);

    return () => {
      controller.abort();
    };
  }, [filters, users]);

  return {
    users: users.usersData,
    error: users.error,
    totalUsers: users.totalUsers,
    isLoading: users.isLoading,
    setLoading,
  };
};

export default useUsers;
