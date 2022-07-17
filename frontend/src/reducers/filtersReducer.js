const FILTERS_OPTIONS = {
  searchTerm: 'searchTerm',
  sortBy: 'sortBy',
  onlyActive: 'onlyActive',
  page: 'page',
  itemsPerPage: 'itemsPerPage',
};

const filtersReducer = (state, action) => {
  switch (action.type) {
    case FILTERS_OPTIONS.onlyActive:
      if (action.value) {
        return {
          ...state,
          page: 1,
          onlyActive: action.value,
          sortBy: 'default',
        };
      }
      return { ...state, page: 1, onlyActive: action.value };
    case FILTERS_OPTIONS.sortBy:
      return { ...state, sortBy: action.value };
    case FILTERS_OPTIONS.searchTerm:
      return { ...state, page: 1, searchTerm: action.value };
    case FILTERS_OPTIONS.page:
      return { ...state, page: action.value };
    case FILTERS_OPTIONS.itemsPerPage:
      return { ...state, page: 1, itemsPerPage: action.value };
    default:
      throw new Error('Invalid action');
  }
};

export default filtersReducer;
