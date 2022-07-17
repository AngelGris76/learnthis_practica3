import { useReducer, useState } from 'react';
import FormContainer from './components/FormContainer';
import UserPagination from './components/UserPagination';
import UserFilters from './components/UserFilters';
import FormsContext from './contexts/FormsContext';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import ViewContainer from './components/ViewContainer';
import filtersReducer from './reducers/filtersReducer';
import INITIAL_FILTERS from './constants/initialFilters';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [filters, filtersDispatch] = useReducer(
    filtersReducer,
    INITIAL_FILTERS
  );

  const { users, error, totalUsers, isLoading, setLoading } = useUsers(filters);
  const {
    showForm,
    setShowUserCreateForm,
    setShowUserEditForm,
    setShowDeleteForm,
    setShowFilters,
  } = useForms();

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FormsContext.Provider
        value={{
          setCurrentUser,
          setLoading,
          setShowFilters,
          setShowDeleteForm,
          setShowUserCreateForm,
          setShowUserEditForm,
        }}
      >
        <UserFilters
          filters={filters}
          dispatch={filtersDispatch}
          showForm={showForm}
        />
        <FormContainer showForm={showForm} currentUser={currentUser} />

        <ViewContainer isLoading={isLoading} users={users} error={error} />
      </FormsContext.Provider>

      {!isLoading && users && (
        <UserPagination
          totalUsers={totalUsers}
          setLoading={setLoading}
          actualPage={filters.page}
          itemsPerPage={filters.itemsPerPage}
          setPage={(page) => {
            filtersDispatch({ type: 'page', value: page });
          }}
          setItemsPerPage={(items) => {
            filtersDispatch({ type: 'itemsPerPage', value: items });
          }}
        />
      )}
    </div>
  );
};

export default App;
