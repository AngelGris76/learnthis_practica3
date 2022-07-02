import { useState } from 'react';
import INITIAL_FILTERS from '../constants/initialFilters';

const useFilter = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const setOnlyActive = (newOnlyActiveValue) => {
    const newFilters = { ...filters, onlyActive: newOnlyActiveValue };
    if (newOnlyActiveValue) {
      newFilters.sortBy = INITIAL_FILTERS.sortBy;
    }
    newFilters.page = INITIAL_FILTERS.page;
    setFilters(newFilters);
  };

  const setSortBy = (newSortByValue) => {
    const newFilters = { ...filters, sortBy: newSortByValue };
    setFilters(newFilters);
  };

  const setSearchTerm = (newSearchTermValue) => {
    const newFilters = { ...filters, searchTerm: newSearchTermValue };
    newFilters.page = INITIAL_FILTERS.page;
    setFilters(newFilters);
  };

  const setPage = (newPageValue) => {
    const newFilters = { ...filters, page: newPageValue };
    setFilters(newFilters);
  };

  const setItemsPerPage = (newItemsPerPageValue) => {
    const newFilters = {
      ...filters,
      page: INITIAL_FILTERS.page,
      itemsPerPage: newItemsPerPageValue,
    };
    setFilters(newFilters);
  };

  return {
    filters,
    setOnlyActive,
    setSortBy,
    setSearchTerm,
    setPage,
    setItemsPerPage,
  };
};

export default useFilter;
