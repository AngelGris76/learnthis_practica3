import { useReducer } from 'react';
import UserPagination from './components/UserPagination';
import UserFilters from './components/UserFilters';
import FormsContext from './contexts/FormsContext';
import useUsers from './hooks/useUsers';
import ViewContainer from './components/ViewContainer';
import filtersReducer from './reducers/filtersReducer';
import INITIAL_FILTERS from './constants/initialFilters';
import {
  itemsPerPageChanged,
  pageChanged,
} from './actions/filtersFormActionsBuilder';

const App = () => {
  const [filters, filtersDispatch] = useReducer(
    filtersReducer,
    INITIAL_FILTERS
  );

  const { users, error, totalUsers, isLoading, setLoading } = useUsers(filters);

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FormsContext.Provider value={{ setLoading, filtersDispatch }}>
        <UserFilters filters={filters} dispatch={filtersDispatch} />
        <ViewContainer isLoading={isLoading} users={users} error={error} />
      </FormsContext.Provider>

      {!isLoading && users && (
        <UserPagination
          totalUsers={totalUsers}
          setLoading={setLoading}
          actualPage={filters.page}
          itemsPerPage={filters.itemsPerPage}
          setPage={(page) => {
            filtersDispatch(pageChanged(page));
          }}
          setItemsPerPage={(items) => {
            filtersDispatch(itemsPerPageChanged(items));
          }}
        />
      )}
    </div>
  );
};

export default App;
