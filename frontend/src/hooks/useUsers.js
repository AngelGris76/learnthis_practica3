import { useEffect, useState } from 'react';
import INITIAL_USERS_VALUE from '../constants/initialUsersValue';
import getAllUser from '../libs/api/getAllUser';

const getData = async (signal, setUsers, filters) => {
  const { error, users, totalUsers } = await getAllUser(signal, filters);

  if (error) {
    return setUsers({ usersData: '', error, isLoading: false, totalUsers: 0 });
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
    const controller = new AbortController();

    getData(controller.signal, setUsers, filters);

    return () => {
      controller.abort();
    };
  }, [filters]);

  return {
    users: users.usersData,
    error: users.error,
    totalUsers: users.totalUsers,
    isLoading: users.isLoading,
    setLoading,
  };
};

export default useUsers;
