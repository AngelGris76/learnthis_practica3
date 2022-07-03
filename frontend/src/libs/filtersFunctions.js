import ORDER_FILTER from '../constants/orderFilter';

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

const paginateUsers = (users, page, itemsPerPage) => {
  const totalUsers = [...users];

  const initialIndex = page * itemsPerPage - itemsPerPage;
  const finalIndex = initialIndex + itemsPerPage;

  const paginatedUsers = totalUsers.slice(initialIndex, finalIndex);

  const totalPages = Math.ceil(totalUsers.length / itemsPerPage);

  return { paginatedUsers, totalPages };
};

const getOnlyActiveUsers = (users, isActive) => {
  if (!users || !users.length) {
    return [];
  }
  if (!isActive) {
    return [...users];
  }
  return users.filter((user) => user.isActive);
};

const getFilteredUsers = (users, filters) => {
  let filteredUsers = getOnlyActiveUsers(users, filters.onlyActive);
  filteredUsers = searchUser(filteredUsers, filters.searchTerm);
  filteredUsers = orderUsers(filteredUsers, filters.sortBy);

  const { paginatedUsers, totalPages } = paginateUsers(
    filteredUsers,
    filters.page,
    filters.itemsPerPage
  );

  return { paginatedUsers, totalPages };
};

export default getFilteredUsers;
