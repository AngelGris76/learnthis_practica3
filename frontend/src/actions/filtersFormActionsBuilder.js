import FILTERS_OPTIONS from '../constants/filterOptions';

const searchTermChanged = (newTerm) => ({
  type: FILTERS_OPTIONS.searchTerm,
  value: newTerm,
});

const sortByChanged = (newSortBy) => ({
  type: FILTERS_OPTIONS.sortBy,
  value: newSortBy,
});

const onlyActiveChanged = (newOnlyActive) => ({
  type: FILTERS_OPTIONS.onlyActive,
  value: newOnlyActive,
});

const pageChanged = (newPage) => ({
  type: FILTERS_OPTIONS.page,
  value: newPage,
});

const itemsPerPageChanged = (newItemsPerPage) => ({
  type: FILTERS_OPTIONS.itemsPerPage,
  value: newItemsPerPage,
});

export {
  searchTermChanged,
  sortByChanged,
  onlyActiveChanged,
  pageChanged,
  itemsPerPageChanged,
};
