import { useState } from 'react';
import FormContainer from './components/FormContainer';
import UserPagination from './components/UserPagination';
import UserFilters from './components/UserFilters';
import FiltersContext from './contexts/FiltersContext';
import FormsContext from './contexts/FormsContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import getFilteredUsers from './libs/filtersFunctions';
import ViewContainer from './components/ViewContainer';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const { filters, filtersSetters, setPage, setItemsPerPage } = useFilter();
  const { users, error, isLoading, setLoading } = useUsers();
  const {
    showForm,
    setShowUserCreateForm,
    setShowUserEditForm,
    setShowDeleteForm,
    setCancelForm,
  } = useForms();

  const { paginatedUsers, totalPages } = getFilteredUsers(users, filters);

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FormsContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          setLoading,
          setCancelForm,
          setShowDeleteForm,
          setShowUserCreateForm,
          setShowUserEditForm,
        }}
      >
        <UserFilters
          filters={filters}
          filtersSetters={filtersSetters}
          showForm={showForm}
        />
        <FormContainer showForm={showForm} />

        <ViewContainer
          isLoading={isLoading}
          users={paginatedUsers}
          error={error}
        />
      </FormsContext.Provider>

      <FiltersContext.Provider
        value={{
          filters,
          setPage,
          setItemsPerPage,
        }}
      >
        {!isLoading && users && (
          <UserPagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
