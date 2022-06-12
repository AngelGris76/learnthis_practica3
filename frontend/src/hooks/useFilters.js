import { useState } from 'react';
import INITIAL_FILTERS from '../constants/initialFilters';

const useFilter = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const setOnlyActive = (newValue) => {
    const newFitlers = { ...filters, onlyActive: newValue };
    if (newValue) {
      newFitlers.userOrder = INITIAL_FILTERS.userOrder;
    }
    setFilters(newFitlers);
  };

  const setOrder = (newValue) => {
    const newFitlers = { ...filters, userOrder: newValue };
    setFilters(newFitlers);
  };

  const setSearchTerm = (newValue) => {
    const newFilters = { ...filters, searchTerm: newValue };
    setFilters(newFilters);
  };

  const setPage = (newValue) => {
    const newFilters = { ...filters, page: newValue };
    setFilters(newFilters);
  };

  const setItemsPerPage = (newValue) => {
    const newFilters = {
      ...filters,
      page: INITIAL_FILTERS.page,
      itemsPerPage: newValue,
    };
    setFilters(newFilters);
  };

  return {
    filters,
    setOnlyActive,
    setOrder,
    setSearchTerm,
    setPage,
    setItemsPerPage,
  };
};

export default useFilter;
