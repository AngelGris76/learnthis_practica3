import { useEffect, useState } from 'react';
import ORDER_FILTER from '../constants/orderFilter';
import INITIAL_USERS_VALUE from '../constants/initialUsersValue';

const getData = async (filters, signal, setUsers) => {
  const IS_LOCAL = import.meta.env.VITE_LOCAL;
  const API_URL = import.meta.env.VITE_API_URL;

  if (IS_LOCAL) {
    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const userData = await response.json();

      const newUser = { usersData: userData, isLoading: false };

      setUsers(newUser);
    } catch (err) {
      const newUser = { usersData: null, isLoading: false };
      setUsers(newUser);
    }
  }
};

const orderByAlphabetic = (users) => {
  const sortedUsers = [...users];
  sortedUsers.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  return sortedUsers;
};

const orderByActive = (users) => {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    if (a.isActive && b.isActive) {
      return 0;
    }

    if (b.isActive) {
      return 1;
    }
    return -1;
  });
  return sortedUsers;
};

const orderByRole = (users) => {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    if (a.role === 'teacher' && b.role !== 'teacher') {
      return -1;
    }
    if (a.role === 'student' && b.role === 'other') {
      return -1;
    }

    return 0;
  });

  return sortedUsers;
};

const orderUsers = (users, order) => {
  switch (order) {
    case ORDER_FILTER.ALPHABETIC.value:
      return orderByAlphabetic(users);
    case ORDER_FILTER.ACTIVE.value:
      return orderByActive(users);
    case ORDER_FILTER.ROLE.value:
      return orderByRole(users);
    default:
      return [...users];
  }
};

const searchUser = (users, searchTerm) => {
  const filteredUsers = [...users];
  const loweredCaseTerm = searchTerm.toLowerCase();

  return filteredUsers.filter(({ name }) =>
    name.toLowerCase().includes(loweredCaseTerm)
  );
};

const getUsersInfoAtPage = (users, page, itemsPerPage) => {
  const paginateUsers = [...users];

  const initialIndex = page * itemsPerPage - itemsPerPage;
  const finalIndex = initialIndex + itemsPerPage;

  const totalUsers = paginateUsers.filter(
    (item, index) => index >= initialIndex && index < finalIndex
  );

  return totalUsers;
};

const useUsers = (filters) => {
  const [users, setUsers] = useState(INITIAL_USERS_VALUE);
  const { onlyActive, userOrder, searchTerm, page, itemsPerPage } = filters;
  const { isLoading } = users;

  const setLoading = () => {
    const newUsers = { ...users, isLoading: true };
    setUsers(newUsers);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (isLoading) {
      getData(filters, signal, setUsers);
    }
  }, [filters, isLoading]);

  let filteredUsers;
  let totalUsers;

  if (users.usersData?.length) {
    filteredUsers = onlyActive
      ? users.usersData.filter((user) => user.isActive)
      : [...users.usersData];

    filteredUsers = searchUser(filteredUsers, searchTerm);

    totalUsers = filteredUsers.length;

    filteredUsers = orderUsers(filteredUsers, userOrder);

    filteredUsers = getUsersInfoAtPage(filteredUsers, page, itemsPerPage);
  } else {
    totalUsers = 0;
  }

  return { usersInfo: filteredUsers, isLoading, totalUsers, setLoading };
};

export default useUsers;
