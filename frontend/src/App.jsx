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
  const {
    filters,
    setOnlyActive,
    setSortBy,
    setSearchTerm,
    setPage,
    setItemsPerPage,
  } = useFilter();

  const { users, error, isLoading, setLoading } = useUsers();

  const {
    showUserDataForm,
    showDeleteForm,
    setShowUserDataForm,
    setShowDeleteForm,
    setCancelForm,
  } = useForms();

  const { paginatedUsers, totalPages } = getFilteredUsers(users, filters);

  const showFilters = !(showUserDataForm || showDeleteForm);

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FiltersContext.Provider
        value={{
          filters,
          setOnlyActive,
          setSortBy,
          setSearchTerm,
          setPage,
          setItemsPerPage,
        }}
      >
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
          {showFilters && <UserFilters />}
          <FormContainer
            showUserDataForm={showUserDataForm}
            showDeleteForm={showDeleteForm}
          />

          {isLoading && <p>Cargando...</p>}
          {!isLoading && <UserGrid users={paginatedUsers} error={error} />}
        </FormsContext.Provider>

        {!isLoading && users && (
          <Pagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
