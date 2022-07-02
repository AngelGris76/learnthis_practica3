import { useEffect, useState } from 'react';
import INITIAL_USERS_VALUE from '../constants/initialUsersValue';
import getAllUser from '../libs/api/getAllUser';

const getData = async (signal, setUsers) => {
  // const IS_LOCAL = import.meta.env.VITE_LOCAL;

  const { error, users } = await getAllUser(signal);

  if (error) {
    return setUsers({ usersData: '', error, isLoading: false });
  }

  setUsers({ usersData: users, error: false, isLoading: false });
};

const useUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS_VALUE);
  const { isLoading } = users;

  const setLoading = () => {
    const newUsers = { ...users, isLoading: true };
    setUsers(newUsers);
  };

  useEffect(() => {
    if (isLoading) {
      const controller = new AbortController();

      getData(controller.signal, setUsers);

      return () => {
        controller.abort();
      };
    }
  }, [isLoading]);

  return { users: users.usersData, error: users.error, isLoading, setLoading };
};

export default useUsers;
