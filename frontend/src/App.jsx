import { useState } from 'react';
import FormContainer from './components/FormContainer';
import Pagination from './components/Pagination';
import UserFilters from './components/UserFilters';
import UserGrid from './components/UserGrid';
import FiltersContext from './contexts/FiltersContext';
import FormsContext from './contexts/FormsContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import getFilteredUsers from './libs/filtersFunctions';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const { filters, filtersSetters, setPage, setItemsPerPage } = useFilter();
  const { users, error, isLoading, setLoading } = useUsers();
  const { showForm, setShowUserDataForm, setShowDeleteForm, setCancelForm } =
    useForms();

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
          setShowUserDataForm,
        }}
      >
        <UserFilters
          filters={filters}
          filtersSetters={filtersSetters}
          showForm={showForm}
        />
        <FormContainer showForm={showForm} />

        {isLoading && <p>Cargando...</p>}
        {!isLoading && <UserGrid users={paginatedUsers} error={error} />}
      </FormsContext.Provider>

      <FiltersContext.Provider
        value={{
          filters,
          setPage,
          setItemsPerPage,
        }}
      >
        {!isLoading && users && (
          <Pagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
