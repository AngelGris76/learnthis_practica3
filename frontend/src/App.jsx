import { useState } from 'react';
import FormContainer from './components/FormContainer';
import UserPagination from './components/UserPagination';
import UserFilters from './components/UserFilters';
import FormsContext from './contexts/FormsContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import ViewContainer from './components/ViewContainer';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const { filters, filtersSetters, setPage, setItemsPerPage } = useFilter();
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
          filtersSetters={filtersSetters}
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
          setPage={setPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default App;
