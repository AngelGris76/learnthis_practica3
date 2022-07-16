import ORDER_FILTER from '../../constants/orderFilter';

const getSortParam = (sortBy) => {
  switch (sortBy) {
    case ORDER_FILTER.ALPHABETIC.value:
      return ['name', 'asc'];
    case ORDER_FILTER.ROLE.value:
      return ['role', 'desc'];
    case ORDER_FILTER.ACTIVE.value:
      return ['isActive', 'desc'];
    default:
      return ['', 'asc'];
  }
};

const getAllUser = async (
  signal,
  { sortBy, searchTerm, onlyActive, page, itemsPerPage }
) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const url = new URL(API_URL);
  const [sort, order] = getSortParam(sortBy);

  if (onlyActive) {
    url.searchParams.append('isActive', onlyActive);
  }
  url.searchParams.append('name_like', searchTerm);
  url.searchParams.append('_page', page);
  url.searchParams.append('_limit', itemsPerPage);
  url.searchParams.append('_sort', sort);
  url.searchParams.append('_order', order);

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error('Error al cargar los datos');
    }

    const totalUsers = response.headers.get('x-total-count');
    const data = await response.json();

    return { error: null, users: data, totalUsers };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { error: null, users: [], totalUsers: 0 };
    }

    return { error: err.message, users: null, totalUsers: 0 };
  }
};

export default getAllUser;
